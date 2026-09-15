import pool from '../config/db.js';

export const emailExists = async (email) => {
  const result = await pool.query(
    'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) AS "exists"',
    [email],
  );

  return result.rows[0].exists;
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT id, name, email, password_hash, role, created_at, updated_at
     FROM users
     WHERE email = $1`,
    [email],
  );

  return result.rows[0] ?? null;
};

export const findPublicUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, email, role, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id],
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

export const revokeAccessToken = async ({ jti, expiresAt }) => {
  await pool.query(
    `INSERT INTO revoked_access_tokens (jti, expires_at)
     VALUES ($1, $2)
     ON CONFLICT (jti) DO NOTHING`,
    [jti, expiresAt],
  );
};

export const isAccessTokenRevoked = async (jti) => {
  const result = await pool.query(
    'SELECT EXISTS(SELECT 1 FROM revoked_access_tokens WHERE jti = $1) AS "exists"',
    [jti],
  );

  return result.rows[0].exists;
};
