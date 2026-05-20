import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { excluir_admin } = req.query;
    let sql = 'SELECT id_usuario, nombre_completo, email, rol, fecha_registro, estado FROM usuarios';
    const params = [];
    if (excluir_admin === 'true') {
      sql += ' WHERE rol != "admin"';
    }
    sql += ' ORDER BY fecha_registro DESC';
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { nombre_completo, email, rol, estado } = req.body;
    await pool.query(
      'UPDATE usuarios SET nombre_completo = ?, email = ?, rol = ?, estado = ? WHERE id_usuario = ?',
      [nombre_completo, email, rol, estado, req.params.id]
    );
    res.json({ id_usuario: Number(req.params.id), nombre_completo, email, rol, estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ? AND rol != "admin"', [req.params.id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
