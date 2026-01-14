import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './authe.rout.js';
import messageRoutes from './message.rout.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

// health
app.get('/api/hello', (req, res) => res.json({ message: 'Hello from backend (serverless-ready)' }));

export default app;
