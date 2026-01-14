import serverless from 'serverless-http';
import app from '../../src/app.js';
import { connectDB } from '../../src/lib/db.js';

let handler;
let dbReady = false;

async function ensureDb() {
  if (dbReady) return;
  try {
    await connectDB();
    dbReady = true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to DB in serverless handler:', err && err.message ? err.message : err);
    // Do not re-throw: allow the handler to run so routes that do not need DB (such as /api/hello) can respond.
  }
}

export default async function (req, res) {
  if (!handler) handler = serverless(app);
  await ensureDb();
  try {
    return handler(req, res);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Handler invocation error:', err && err.message ? err.message : err);
    res.statusCode = 500;
    return res.end('Internal Server Error');
  }
}
