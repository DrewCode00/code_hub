'use strict';

var SocketIO = require('socket.io');


module.exports = function(server){
    var io = SocketIO(server);
    io.onconnection('connection', function(socket){
        socket.on('chatMessage', function(data){
            io.emit('chatMessage', data);
            
        })
    })
}