import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { socketAuthMiddlaware } from '../middleware/socket.auth.middlware.js';

dotenv.config();

let io;
const userSocketMap = {};

export function initSockets(server) {
  if (io) return io; // already initialized

  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL],
      credentials: true,
    },
  });

  // apply authentication middleware to all socket connection
  io.use(socketAuthMiddlaware);

  io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('A user connected', socket.user?.FullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('A user disconnect', socket.user?.FullName);

      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });

  return io;
}

export function getReciverSocketId(userId) {
  return userSocketMap[userId];
}

export { io };