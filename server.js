const express = require('express');
const app = express();

app.use(express.static('public'));

const server = app.listen(3000); 

console.log('my server is running?');

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log('client is connected: ' + socket.id);

    socket.on('mouse', (data) => {
        console.log(data);
        socket.broadcast.emit('mouse', data);
    });
});