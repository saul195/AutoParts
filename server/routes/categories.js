import { Router } from 'express';
import pool from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id_categoria: result.insertId, nombre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { nombre } = req.body;
    await pool.query('UPDATE categorias SET nombre = ? WHERE id_categoria = ?', [nombre, req.params.id]);
    res.json({ id_categoria: Number(req.params.id), nombre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [req.params.id]);
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
