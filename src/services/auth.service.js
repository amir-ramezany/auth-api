import {
  createUser,
  emailExists,
  findPublicUserById,
  findUserByEmail,
} from '../repositories/user.repository.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  createAccessToken,
} from '../utils/token.js';

const createDuplicateEmailError = () => {
  const error = new Error('An account with this email already exists');
  error.code = 'EMAIL_ALREADY_EXISTS';
  return error;
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await emailExists(email);

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

const createInvalidCredentialsError = () => {
  const error = new Error('Invalid email or password');
  error.code = 'INVALID_CREDENTIALS';
  return error;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw createInvalidCredentialsError();
  }

  const passwordMatches = await verifyPassword(password, user.password_hash);

  if (!passwordMatches) {
    throw createInvalidCredentialsError();
  }

  const accessToken = createAccessToken(user);
  const publicUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return {
    accessToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    tokenType: 'Bearer',
    user: publicUser,
  };
};

export const getCurrentUser = async (userId) => {
  const user = await findPublicUserById(userId);

  if (!user) {
    const error = new Error('Authenticated user no longer exists');
    error.code = 'AUTHENTICATED_USER_NOT_FOUND';
    throw error;
  }

  return user;
};
