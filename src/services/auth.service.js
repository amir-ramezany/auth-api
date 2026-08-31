import {
  createUser,
  findUserByEmail,
} from '../repositories/user.repository.js';
import { hashPassword } from '../utils/password.js';

const createDuplicateEmailError = () => {
  const error = new Error('An account with this email already exists');
  error.code = 'EMAIL_ALREADY_EXISTS';
  return error;
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw createDuplicateEmailError();
  }

  const passwordHash = await hashPassword(password);

  try {
    return await createUser({ name, email, passwordHash });
  } catch (error) {
    if (error.code === '23505') {
      throw createDuplicateEmailError();
    }

    throw error;
  }
};
