import mysql, { Pool } from 'mysql2/promise';
import type { QueryResult } from 'mysql2';

let pool: Pool | null = null;
let lastConnectionError: string | null = null;
let connected = false;

const requiredEnv = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER'] as const;

export const isDbConnected = (): boolean => connected && !!pool;

export const getDbInitError = (): string | null => lastConnectionError;

export const getDB = (): Pool => {
  if (!pool) {
    const suffix = lastConnectionError ? ` (${lastConnectionError})` : '';
    throw new Error(`Database is not connected${suffix}`);
  }
  return pool;
};

export const query = async <T extends QueryResult>(sql: string, params: unknown[] = []): Promise<T> => {
  const [rows] = await getDB().query<T>(sql, params);
  return rows;
};

const initializeSchema = async (): Promise<void> => {
  await getDB().query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      icon VARCHAR(255) NOT NULL DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await getDB().query(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      display_order INT NOT NULL DEFAULT 0,
      introduction TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await getDB().query(`
    CREATE TABLE IF NOT EXISTS opinions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL DEFAULT 'Anonymous',
      comment TEXT NOT NULL,
      rating INT NOT NULL,
      likes_count INT NOT NULL DEFAULT 0,
      liked_by JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await getDB().query(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      content LONGTEXT NOT NULL,
      summary TEXT,
      category VARCHAR(255) NOT NULL,
      district VARCHAR(255) NOT NULL DEFAULT '',
      author VARCHAR(255) NOT NULL,
      image_url TEXT NOT NULL,
      published BOOLEAN NOT NULL DEFAULT FALSE,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      views INT NOT NULL DEFAULT 0,
      tags JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await getDB().query(`
    CREATE TABLE IF NOT EXISTS business_settings (
      id INT PRIMARY KEY,
      site_name VARCHAR(255) NOT NULL DEFAULT 'Sylhety News',
      contact_email VARCHAR(255) NOT NULL DEFAULT '',
      contact_phone VARCHAR(100) NOT NULL DEFAULT '',
      contact_address TEXT,
      ad_rate_per_1000_views DECIMAL(10,2) NOT NULL DEFAULT 2.50,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await getDB().query(`
    INSERT INTO business_settings (id)
    VALUES (1)
    ON DUPLICATE KEY UPDATE id = id;
  `);

  await getDB().query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Ensure default admin exists (robust TypeScript/MySQL handling)
  const [adminRows]: any = await getDB().query(
    `SELECT * FROM users WHERE email = 'admin@gmail.com'`
  );
  if (!adminRows || adminRows.length === 0) {
      const bcrypt = (await import('bcryptjs')).default;
    const passwordHash = await bcrypt.hash('Admin@123', 10);
    await getDB().query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ('Admin', 'admin@gmail.com', ?, 'admin')`,
      [passwordHash]
    );
    console.log('Default admin user created: admin@gmail.com / Admin@123');
  }
};

export const connectDB = async (): Promise<void> => {
  try {
    lastConnectionError = null;
    connected = false;
    for (const key of requiredEnv) {
      if (!process.env[key]) {
        throw new Error(`${key} is not set`);
      }
    }

    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await getDB().query('SELECT 1');
    await initializeSchema();
    connected = true;
    console.log('MySQL connected successfully');
  } catch (error) {
    pool = null;
    connected = false;
    lastConnectionError = error instanceof Error ? error.message : String(error);
    console.error('MySQL connection failed:', error);
    console.warn(
      'Continuing without database. DB-backed endpoints will return 500 until MySQL is available.'
    );
  }
};
