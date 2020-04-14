const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('web connection');
  socket.emit('Login', 'Welcome');

  socket.broadcast.emit('Login', 'new user joined')
  
  socket.on('disconnect', () => {
    io.emit('Login', 'disconnected');
  })

  socket.on('sendMessage', (msg, callback) => {
    io.emit('Login', msg);
    callback("Delivered");
  })
  socket.on('sendLocation', ({latitude, longitude}, callback) => {
    io.emit('locationMessage', `https://google.com/maps?q=${latitude},${longitude}`);
    callback(); 
  })
})
server.listen(port, () => {
  console.log(`Server is on ${port}`);
})
