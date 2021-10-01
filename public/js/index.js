const square = document.querySelector('.square');
document.addEventListener('mousemove', e => {
  square.style.left = e.pageX + "px";
  square.style.top = e.pageY + "px";
});

const socket = io();