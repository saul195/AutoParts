import { Router } from 'express';
import pool from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorize('admin', 'almacen'), async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT h.*, p.nombre AS producto_nombre, pr.nombre_empresa AS proveedor_nombre
       FROM historico_entradas h
       JOIN productos p ON h.id_producto = p.id_producto
       JOIN proveedores pr ON h.id_proveedor = pr.id_proveedor
       ORDER BY h.fecha_entrada DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id_producto, id_proveedor, precio_compra, cantidad } = req.body;

    const [result] = await conn.query(
      'INSERT INTO historico_entradas (id_producto, id_proveedor, precio_compra, cantidad) VALUES (?, ?, ?, ?)',
      [id_producto, id_proveedor, precio_compra, cantidad]
    );

    await conn.query(
      'UPDATE productos SET stock = stock + ? WHERE id_producto = ?',
      [cantidad, id_producto]
    );

    await conn.commit();
    res.status(201).json({ id_historico: result.insertId });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
});

export default router;
