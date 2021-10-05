import http from 'http';
import mongoose from 'mongoose';
import app from './index.js';
import wss from './socket.js';

const httpServer = http.createServer(app);
const wsServer = wss(httpServer);

mongoose.connect('mongodb://127.0.0.1:27017/lab-db', (err) => {
  if (err) return;
  console.log('DB successfully connect!');

  httpServer.listen(8000, () => {
    console.log('Server started...');
  });
});