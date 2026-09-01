import { Router } from 'express';

import { getAdminExample } from '../controllers/admin.controller.js';
import {
  authenticateAccessToken,
  authorizeRoles,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.get(
  '/example',
  authenticateAccessToken,
  authorizeRoles('admin'),
  getAdminExample,
);

export default router;
