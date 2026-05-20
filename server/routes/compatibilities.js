import { Router } from 'express';
import pool from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/producto/:idProducto', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM compatibilidades WHERE id_producto = ? ORDER BY marca, modelo',
      [req.params.idProducto]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  try {
    const { id_producto, marca, modelo, anio_inicio, anio_fin } = req.body;
    const [result] = await pool.query(
      'INSERT INTO compatibilidades (id_producto, marca, modelo, anio_inicio, anio_fin) VALUES (?, ?, ?, ?, ?)',
      [id_producto, marca, modelo, anio_inicio, anio_fin]
    );
    res.status(201).json({ id_compatibilidad: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, authorize('admin', 'almacen'), async (req, res) => {
  try {
    await pool.query('DELETE FROM compatibilidades WHERE id_compatibilidad = ?', [req.params.id]);
    res.json({ mensaje: 'Compatibilidad eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
