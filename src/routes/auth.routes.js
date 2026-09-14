import { Router } from 'express';

import {
  login,
  logout,
  me,
  register,
} from '../controllers/auth.controller.js';
import { authenticateAccessToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateAccessToken, me);
router.post('/logout', authenticateAccessToken, logout);

export default router;
