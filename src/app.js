import express from 'express';

import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRouter);

export default app;
