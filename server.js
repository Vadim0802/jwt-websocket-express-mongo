import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import app from './index.js';

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

mongoose.connect('mongodb://127.0.0.1:27017/lab-db', (err) => {
  if (err) return;
  console.log('DB successfully connect!');

  wsServer.on('connection', (socket) => {
    console.log('Connection');
  });

  httpServer.listen(8000, () => {
    console.log('Server started...');
  });
});