import { Router } from 'express';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    let sql;
    let params;

    if (req.user.rol === 'admin') {
      sql = `
        SELECT v.*, u.nombre_completo AS usuario_nombre
        FROM ventas v
        JOIN usuarios u ON v.id_usuario = u.id_usuario
        ORDER BY v.fecha DESC
      `;
      params = [];
    } else {
      sql = `
        SELECT v.*, u.nombre_completo AS usuario_nombre
        FROM ventas v
        JOIN usuarios u ON v.id_usuario = u.id_usuario
        WHERE v.id_usuario = ?
        ORDER BY v.fecha DESC
      `;
      params = [req.user.id];
    }

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const [venta] = await pool.query(
      `SELECT v.*, u.nombre_completo AS usuario_nombre
       FROM ventas v
       JOIN usuarios u ON v.id_usuario = u.id_usuario
       WHERE v.id_venta = ?`,
      [req.params.id]
    );
    if (venta.length === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    const [detalle] = await pool.query(
      `SELECT dv.*, p.nombre AS producto_nombre
       FROM detalle_ventas dv
       JOIN productos p ON dv.id_producto = p.id_producto
       WHERE dv.id_venta = ?`,
      [req.params.id]
    );

    const [pagos] = await pool.query(
      'SELECT * FROM pagos WHERE id_venta = ?',
      [req.params.id]
    );

    res.json({ ...venta[0], detalle, pagos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { items, metodo_pago } = req.body;

    if (!items || items.length === 0) {
      await conn.rollback();
      return res.status(400).json({ error: 'La venta debe tener al menos un producto' });
    }

    let subtotal = 0;
    for (const item of items) {
      const [producto] = await conn.query(
        'SELECT precio, stock FROM productos WHERE id_producto = ?',
        [item.id_producto]
      );
      if (producto.length === 0) {
        await conn.rollback();
        return res.status(404).json({ error: `Producto ${item.id_producto} no encontrado` });
      }
      if (producto[0].stock < item.cantidad) {
        await conn.rollback();
        return res.status(400).json({
          error: `Stock insuficiente para producto ${item.id_producto}. Disponible: ${producto[0].stock}`,
        });
      }
      subtotal += producto[0].precio * item.cantidad;
    }

    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const [venta] = await conn.query(
      'INSERT INTO ventas (id_usuario, subtotal, iva, total, estado_venta) VALUES (?, ?, ?, ?, "pagada")',
      [req.user.id, subtotal, iva, total]
    );

    for (const item of items) {
      const [producto] = await conn.query('SELECT precio FROM productos WHERE id_producto = ?', [item.id_producto]);
      await conn.query(
        'INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_venta) VALUES (?, ?, ?, ?)',
        [venta.insertId, item.id_producto, item.cantidad, producto[0].precio]
      );
      await conn.query(
        'UPDATE productos SET stock = stock - ? WHERE id_producto = ?',
        [item.cantidad, item.id_producto]
      );
    }

    if (metodo_pago) {
      await conn.query(
        'INSERT INTO pagos (id_venta, metodo_pago, monto) VALUES (?, ?, ?)',
        [venta.insertId, metodo_pago, total]
      );
    }

    await conn.commit();
    res.status(201).json({ id_venta: venta.insertId, subtotal, iva, total });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
});

export default router;
