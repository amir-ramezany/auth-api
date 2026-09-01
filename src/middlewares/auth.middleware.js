import { verifyAccessToken } from '../utils/token.js';

const sendUnauthorized = (res, message) =>
  res.status(401).json({ message });

export const authenticateAccessToken = (req, res, next) => {
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
    typeof payload !== 'object' ||
    typeof payload.sub !== 'string' ||
    !['user', 'admin'].includes(payload.role)
  ) {
    return sendUnauthorized(res, 'Invalid access token');
  }

  req.user = {
    id: payload.sub,
    role: payload.role,
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
