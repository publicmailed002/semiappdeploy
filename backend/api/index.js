import serverless from 'serverless-http';
import app from '../../src/app.js';
import { connectDB } from '../../src/lib/db.js';

let handler;
let dbReady = false;

async function ensureDb() {
  if (dbReady) return;
  await connectDB();
  dbReady = true;
}

export default async function (req, res) {
  await ensureDb();
  if (!handler) handler = serverless(app);
  return handler(req, res);
}
