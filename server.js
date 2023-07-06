const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const server = app.listen(PORT);

// app.listen(PORT, '0.0.0.0', () => {
console.log(`Server Started at Port ${PORT}`);
//  });

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log('client is connected: ' + socket.id);

    socket.on('mouse', (data) => {
        //console.log(data);
        socket.broadcast.emit('mouse', data);
    });
});