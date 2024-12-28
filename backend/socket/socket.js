import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

// Initialize Express app
const app = express();

const server = http.createServer(app);

console.log("socket")
// Initialize Socket.IO on the HTTP server
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'], // Allow requests from this origin
    methods: ['GET','POST'], // Allow these methods
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

const userSocketMap = {};
// Handle client connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  const userId = socket.handshake.query.userId

  if(userId !== undefined){
    userSocketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers',Object.keys(userSocketMap));

  socket.on("disconnect",()=>{
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
  })
});

// Listen on a port (e.g., 8080)
//server.listen(8080);
// Export app, io, and server for testing or additional configuration
export { app, io, server };
