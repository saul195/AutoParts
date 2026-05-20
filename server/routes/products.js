import { Router } from 'express';
import pool from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { search, categoria } = req.query;
    let sql = `
      SELECT p.*, c.nombre AS categoria_nombre
      FROM productos p
      JOIN categorias c ON p.id_categoria = c.id_categoria
    `;
    const params = [];
    const conditions = [];

    if (search) {
      conditions.push('(p.nombre LIKE ? OR p.descripcion LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    if (categoria) {
      conditions.push('p.id_categoria = ?');
      params.push(categoria);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY p.nombre';

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre AS categoria_nombre
       FROM productos p
       JOIN categorias c ON p.id_categoria = c.id_categoria
       WHERE p.id_producto = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  try {
    const { id_categoria, nombre, descripcion, precio, stock, ubicacion_pasillo, imagen_url } = req.body;
    const [result] = await pool.query(
      `INSERT INTO productos (id_categoria, nombre, descripcion, precio, stock, ubicacion_pasillo, imagen_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_categoria, nombre, descripcion || null, precio, stock || 0, ubicacion_pasillo || null, imagen_url || null]
    );
    const [producto] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [result.insertId]);
    res.status(201).json(producto[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  try {
    const { id_categoria, nombre, descripcion, precio, stock, ubicacion_pasillo, imagen_url } = req.body;
    await pool.query(
      `UPDATE productos
       SET id_categoria = ?, nombre = ?, descripcion = ?, precio = ?,
           stock = ?, ubicacion_pasillo = ?, imagen_url = ?
       WHERE id_producto = ?`,
      [id_categoria, nombre, descripcion || null, precio, stock, ubicacion_pasillo || null, imagen_url || null, req.params.id]
    );
    const [producto] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id]);
    if (producto.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/stock', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  try {
    const { cantidad } = req.body;
    const [producto] = await pool.query('SELECT stock FROM productos WHERE id_producto = ?', [req.params.id]);
    if (producto.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const nuevoStock = producto[0].stock + cantidad;
    if (nuevoStock < 0) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }
    await pool.query('UPDATE productos SET stock = ? WHERE id_producto = ?', [nuevoStock, req.params.id]);
    res.json({ id_producto: Number(req.params.id), stock: nuevoStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
