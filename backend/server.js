import http from 'http';
import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/lib/db.js';
import { initSockets } from './src/lib/socket.js';

dotenv.config();

const port = process.env.PORT || 3001;
const server = http.createServer(app);

// init socket server for local dev
initSockets(server);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on http://localhost:${port}`);
  connectDB();
});
