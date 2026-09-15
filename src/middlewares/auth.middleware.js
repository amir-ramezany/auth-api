import { verifyAccessToken } from '../utils/token.js';
import { isAccessTokenRevoked } from '../services/auth.service.js';

const sendUnauthorized = (res, message) =>
  res.status(401).json({ message });

export const authenticateAccessToken = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (!authorization) {
    return sendUnauthorized(res, 'Access token is required');
  }

  const match = authorization.match(/^Bearer ([^\s]+)$/i);

  if (!match) {
    return sendUnauthorized(
      res,
      'Authorization header must use the Bearer scheme',
    );
  }

  let payload;

  try {
    payload = verifyAccessToken(match[1]);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendUnauthorized(res, 'Access token has expired');
    }

    return sendUnauthorized(res, 'Invalid access token');
  }

  if (
    payload === null ||
    typeof payload !== 'object' ||
    typeof payload.sub !== 'string' ||
    typeof payload.jti !== 'string' ||
    typeof payload.exp !== 'number' ||
    !['user', 'admin'].includes(payload.role)
  ) {
    return sendUnauthorized(res, 'Invalid access token');
  }

  if (await isAccessTokenRevoked(payload.jti)) {
    return sendUnauthorized(res, 'Access token has been revoked');
  }

  req.user = {
    id: payload.sub,
    role: payload.role,
  };
  req.auth = {
    jti: payload.jti,
    expiresAt: new Date(payload.exp * 1000),
  };

  return next();
};

export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return sendUnauthorized(res, 'Authentication is required');
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      message: 'You do not have permission to access this resource',
    });
  }

  return next();
};
