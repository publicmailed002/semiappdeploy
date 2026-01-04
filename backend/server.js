import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/authe.rout.js';
import { connectDB } from './src/lib/db.js';
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

// app.get('/api/server', (req, res) => {
//   res.json({ message: 'Server endpoint running locally' });
// });

// // Keep the hello route for parity with the serverless function
// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from backend on Vercel (local server)' });
// });


app.use('/api/auth',authRoutes);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on http://localhost:${port}`);
  connectDB();
});
