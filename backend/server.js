import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/authe.rout.js';
import messageauth from './src/message.rout.js';
import { connectDB } from './src/lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json({limit:"5mb"}));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
const port = process.env.PORT || 3001;

// app.get('/api/server', (req, res) => {
//   res.json({ message: 'Server endpoint running locally' });
// });

// // Keep the hello route for parity with the serverless function
// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from backend on Vercel (local server)' });
// });


app.use(cookieParser())
app.use('/api/auth',authRoutes);
app.use('/api/message',messageauth)


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on http://localhost:${port}`);
  connectDB();
});
