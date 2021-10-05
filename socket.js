import { Server } from 'socket.io';
import { v4 } from 'uuid';

export default (httpServer) => {
  const wsServer = new Server(httpServer);
  const clients = [];

  wsServer.on('connection', (socket) => {
    const id = v4();
    clients.push(id);

    socket.emit('init-client', id);
    socket.emit('init-clients', clients.filter((i) => i !== id));

    socket.on('change-position', (data) => {
      wsServer.emit('change-position', data);
    });

    socket.on('disconnect', () => {
      wsServer.emit('client-destroy', id);
    });

    wsServer.emit('connected-client', id);
  });

  return wsServer;
};