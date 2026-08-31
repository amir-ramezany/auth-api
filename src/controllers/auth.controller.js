import { registerUser } from '../services/auth.service.js';
import { validateRegistration } from '../validators/auth.validator.js';

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
