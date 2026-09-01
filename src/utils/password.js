import bcrypt from 'bcrypt';

const BCRYPT_WORK_FACTOR = 12;

export const hashPassword = (password) =>
  bcrypt.hash(password, BCRYPT_WORK_FACTOR);

export const verifyPassword = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash);
