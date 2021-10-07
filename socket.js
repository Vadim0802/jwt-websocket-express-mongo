import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import User from './models/User.js';

export default (httpServer) => {
  const wsServer = new Server(httpServer, { cookie: true });
  let clients = [];

  wsServer.on('connection', async (socket) => {
    const { access_token } = cookie.parse(socket.request.headers.cookie);
    const { _id } = jwt.verify(access_token, 'my-super-secret-key');
    const { coords } = await User.findById({ _id });

    if (!clients.includes(_id)) {
      console.log(`Connecting client with ID: ${_id}`);
      clients.push({ _id, coords });
    }

    socket.emit('init-client', { _id, coords });
    socket.emit('init-clients', clients.filter(({ _id: i }) => i !== _id));
    wsServer.emit('connected-client', { _id, coords });

    socket
      .on('change-position', (data) => {
        coords.x = data.x;
        coords.y = data.y;
        wsServer.emit('change-position', data); 
      })
      .on('disconnect', async () => {
        console.log(`Client ${_id} disconnected`);
        await User.findByIdAndUpdate({ _id }, { $set: { coords } })
        clients = clients.filter(({ _id: i }) => i !== _id);
        wsServer.emit('client-destroy', _id); 
      });
  });
  return wsServer;
};