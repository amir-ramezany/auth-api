import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT id, email FROM users WHERE email = $1',
    [email],
  );

  return result.rows[0] ?? null;
};

export const createUser = async ({ name, email, passwordHash }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, passwordHash],
  );

  return result.rows[0];
};
