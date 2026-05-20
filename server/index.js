import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

import express from 'express';
import cors from 'cors';
import pool, { DB_NAME } from './db.js';
import setupDatabase from './setup.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import supplierRoutes from './routes/suppliers.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
import compatibilityRoutes from './routes/compatibilities.js';
import purchaseRoutes from './routes/purchases.js';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/compatibilities', compatibilityRoutes);
app.use('/api/purchases', purchaseRoutes);

app.get('/', (_req, res) => {
  res.json({ mensaje: 'API Refaccionaria Autoparts', docs: '/api/health' });
});

app.get('/api/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ status: 'ok', db: rows[0].result === 2, database: DB_NAME });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/dashboard/stats', async (_req, res) => {
  try {
    const [[{ totalProductos }]] = await pool.query('SELECT COUNT(*) AS totalProductos FROM productos');
    const [[{ totalVentas }]] = await pool.query('SELECT COUNT(*) AS totalVentas FROM ventas');
    const [[{ ingresos }]] = await pool.query('SELECT COALESCE(SUM(total), 0) AS ingresos FROM ventas WHERE estado_venta = "pagada"');
    const [[{ productosBajoStock }]] = await pool.query('SELECT COUNT(*) AS productosBajoStock FROM productos WHERE stock < 10');
    res.json({ totalProductos, totalVentas, ingresos, productosBajoStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function listen(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port)
      .once('listening', () => {
        const addr = server.address();
        console.log(`Servidor corriendo en http://localhost:${addr.port}`);
        resolve(server);
      })
      .once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.warn(`Puerto ${port} ocupado, buscando puerto libre...`);
          server.close();
          listen(0).then(resolve).catch(reject);
        } else {
          reject(err);
        }
      });
  });
}

async function start() {
  try {
    await setupDatabase();
  } catch (err) {
    console.warn('DB setup skipped:', err.message);
  }

  try {
    await listen(Number(PORT));
  } catch (err) {
    console.error('Error al iniciar servidor:', err.message);
  }
}

start();
