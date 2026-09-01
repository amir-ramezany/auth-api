import express from 'express';

import adminRouter from './routes/admin.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

export default app;
