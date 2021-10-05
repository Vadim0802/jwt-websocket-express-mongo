const socket = io();
const body = document.querySelector('body');
const clientCircle = document.createElement('div');

const createDivEl = (id, className) => {
  const clientFigure = document.createElement('div');
  clientFigure.className = className;
  clientFigure.id = id;
  return clientFigure;
};

socket.on('init-client', (id) => {
  clientCircle.className = 'square';
  clientCircle.id = id;
  body.append(clientCircle);
  document.addEventListener('mousemove', e => {
    clientCircle.style.left = e.pageX + "px";
    clientCircle.style.top = e.pageY + "px";
    socket.emit('change-position', { x: clientCircle.style.left, y: clientCircle.style.top, id });
  });
});

socket.on('init-clients', (clients) => {
  clients.forEach((id) => {
    const clientFigure = createDivEl(id, 'square');
    body.append(clientFigure);
  });
});

socket.on('connected-client', (id) => {
  if (id !== clientCircle.id) {
    const clientFigure = createDivEl(id, 'square');
    body.append(clientFigure);
  }
});

socket.on('change-position', (data) => {
  const el = document.getElementById(data.id);
  el.style.left = data.x;
  el.style.top = data.y;
});

socket.on('client-destroy', (id) => {
  document.getElementById(id).remove();
});
