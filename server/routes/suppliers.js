import { Router } from 'express';
import pool from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM proveedores ORDER BY nombre_empresa');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  try {
    const { nombre_empresa, rfc, telefono } = req.body;
    const [result] = await pool.query(
      'INSERT INTO proveedores (nombre_empresa, rfc, telefono) VALUES (?, ?, ?)',
      [nombre_empresa, rfc || null, telefono || null]
    );
    res.status(201).json({ id_proveedor: result.insertId, nombre_empresa, rfc, telefono });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  try {
    const { nombre_empresa, rfc, telefono } = req.body;
    await pool.query(
      'UPDATE proveedores SET nombre_empresa = ?, rfc = ?, telefono = ? WHERE id_proveedor = ?',
      [nombre_empresa, rfc || null, telefono || null, req.params.id]
    );
    res.json({ id_proveedor: Number(req.params.id), nombre_empresa, rfc, telefono });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await pool.query('DELETE FROM proveedores WHERE id_proveedor = ?', [req.params.id]);
    res.json({ mensaje: 'Proveedor eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
