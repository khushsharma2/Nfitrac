import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

console.log('Starting backend server without MongoDB connection.');
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use((req: express.Request, res: express.Response, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});

import authRouter from './routes/auth';
import profileRouter from './routes/profile';
import activityRouter from './routes/activity';
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'CSE 4th Year Project Backend is running without MongoDB' });
});

app.get('/welcome', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Welcome to the backend API!' });
});
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/activity', activityRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} without MongoDB connection`);
});
