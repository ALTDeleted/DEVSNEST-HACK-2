const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

io.on('connection', onConnection);

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

const port = 8080;
http.listen(port, ()=> console.log(`server is running on port ${port}`));