import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { query } from '../config/database.js';

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

export const createUser = async ({
  name,
  email,
  passwordHash,
  role,
}: {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}) => {
  const result = await query<ResultSetHeader>(
    `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
    [name, email, passwordHash, role]
  );

  return {
    id: String(result.insertId),
    name,
    email,
    role,
  };
};

export const findUserByEmail = async (email: string): Promise<UserRow | null> => {
  const rows = await query<UserRow[]>(
    `SELECT id, name, email, password_hash, role
     FROM users
     WHERE LOWER(email) = LOWER(?)
     LIMIT 1`,
    [email]
  );

  return rows[0] ?? null;
};

export const findUserById = async (id: string | number): Promise<UserRow | null> => {
  const rows = await query<UserRow[]>(
    `SELECT id, name, email, password_hash, role FROM users WHERE id = ? LIMIT 1`,
    [id]
  );

  return rows[0] ?? null;
};
