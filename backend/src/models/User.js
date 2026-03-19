import { query } from "../config/database.js";

export const createUser = async ({ name, email, passwordHash, role }) => {
  const result = await query(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [name, email, passwordHash, role]
  );
  return {
    id: String(result.insertId),
    name,
    email,
    role,
  };
};

export const findUserByEmail = async (email) => {
  const rows = await query(
    "SELECT id, name, email, password_hash, role FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1",
    [email]
  );
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const rows = await query(
    "SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
};
