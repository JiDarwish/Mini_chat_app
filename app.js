import express from 'express';
import socket_io from 'socket.io';

const app = express();
const port = 3000;

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const io = socket_io(server);
io.on('connection', socket => {
  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });
});
