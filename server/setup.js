import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'autoparts_db';

async function setupDatabase() {
  const conn = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  try {
    await conn.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\`;`);
    await conn.query(`CREATE DATABASE \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await conn.query(`USE \`${DB_NAME}\`;`);

    const schemaPath = path.join(__dirname, 'sql', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await conn.query(schemaSql);

    const seedPath = path.join(__dirname, 'sql', 'seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await conn.query(seedSql);

    console.log(`Database "${DB_NAME}" ready — schema + seed applied.`);
  } finally {
    await conn.end();
  }
}

export default setupDatabase;
