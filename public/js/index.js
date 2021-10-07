const socket = io();
const body = document.querySelector('body');
const clientCircle = document.createElement('div');

const createDivEl = (id, className, coords) => {
  const clientFigure = document.createElement('div');
  clientFigure.className = className;
  clientFigure.id = id;
  clientFigure.style.left = coords.x;
  clientFigure.style.top = coords.y;
  return clientFigure;
};

socket.on('init-client', ({ _id: id, coords }) => {
  console.log('init-client', id)
  clientCircle.className = 'square';
  clientCircle.id = id;
  clientCircle.style.left = coords.x;
  clientCircle.style.top = coords.y;
  body.append(clientCircle);
  document.addEventListener('mousemove', e => {
    clientCircle.style.left = e.pageX + "px";
    clientCircle.style.top = e.pageY + "px";
    socket.emit('change-position', { x: clientCircle.style.left, y: clientCircle.style.top, id });
  });
});

socket.on('init-clients', (clients) => {
  clients.forEach(({ _id: id, coords }) => {
    const clientFigure = createDivEl(id, 'square', coords);
    body.append(clientFigure);
  });
});

socket.on('connected-client', ({ _id: id, coords }) => {
  if (id !== clientCircle.id) {
    const clientFigure = createDivEl(id, 'square', coords);
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
