import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { generateToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? AND estado = "activo"',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id_usuario,
        nombre: user.nombre_completo,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { nombre_completo, email, password } = req.body;
    if (!nombre_completo || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const [existing] = await pool.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre_completo, email, password, rol) VALUES (?, ?, ?, "usuario")',
      [nombre_completo, email, hashed]
    );

    const user = {
      id_usuario: result.insertId,
      nombre_completo,
      email,
      rol: 'usuario',
    };

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: {
        id: user.id_usuario,
        nombre: user.nombre_completo,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token requerido' });
    }
    const { authenticate } = await import('../middleware/auth.js');
    const jwt = await import('jsonwebtoken');
    const { JWT_SECRET } = await import('../middleware/auth.js');

    const token = header.split(' ')[1];
    const decoded = jwt.default.verify(token, JWT_SECRET);
    const [rows] = await pool.query(
      'SELECT id_usuario, nombre_completo, email, rol FROM usuarios WHERE id_usuario = ?',
      [decoded.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
});

export default router;
