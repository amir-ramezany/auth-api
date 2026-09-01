import 'dotenv/config';

import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;

if (!accessTokenSecret) {
  throw new Error('JWT_ACCESS_SECRET environment variable is required');
}

export const ACCESS_TOKEN_EXPIRES_IN =
  process.env.JWT_ACCESS_EXPIRES_IN || '15m';

export const createAccessToken = ({ id, role }) =>
  jwt.sign(
    { role },
    accessTokenSecret,
    {
      algorithm: 'HS256',
      subject: String(id),
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );

export const verifyAccessToken = (token) =>
  jwt.verify(token, accessTokenSecret, {
    algorithms: ['HS256'],
  });
