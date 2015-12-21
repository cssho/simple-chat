var io = require('socket.io').listen(3000);
var fs = require("fs");
var userHash = {};
io.sockets.on('connection', function (socket) {
  fs.readFile('./msglog.txt', 'utf-8', function (err, data) {
    if (err) {
      fs.appendFile('./error.txt', err, 'utf-8');
    } else {
      io.sockets.emit('log', data);
    }
  });
  for(var key in userHash){
    io.sockets.emit('add', { id: key, name: userHash[key] });
  }
  socket.on('add', function (data) {
    userHash[socket.id] = data;
    io.sockets.emit('add', { id: socket.id, name: data });
  });
  socket.on("disconnect", function () {
    delete userHash[socket.id];
    io.sockets.emit('remove', socket.id);
  });
  socket.on('msg', function (data) {
    io.sockets.emit('msg', data);
    fs.appendFile('./msglog.txt', data + '<hr>', 'utf-8', function (err) {
      if (err) {
        fs.appendFile('./error.txt', err, 'utf-8');
      }
    });
  });
});