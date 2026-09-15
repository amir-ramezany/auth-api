import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.service.js';
import {
  validateLogin,
  validateRegistration,
} from '../validators/auth.validator.js';

export const register = async (req, res, next) => {
  const { errors, value } = validateRegistration(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  try {
    const user = await registerUser(value);

    return res.status(201).json({ user });
  } catch (error) {
    if (error.code === 'EMAIL_ALREADY_EXISTS') {
      return res.status(409).json({ message: error.message });
    }

    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { errors, value } = validateLogin(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  try {
    const authentication = await loginUser(value);

    return res.status(200).json(authentication);
  } catch (error) {
    if (error.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ message: error.message });
    }

    return next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    return res.status(200).json({ user });
  } catch (error) {
    if (error.code === 'AUTHENTICATED_USER_NOT_FOUND') {
      return res.status(401).json({ message: error.message });
    }

    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await logoutUser(req.auth);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
