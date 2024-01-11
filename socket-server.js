'use strict';

var SocketIO = require('socket.io');


module.exports = function(server){
    var io = SocketIO(server);

    io.on('connection', function(socket){
        socket.on('joinRoom', function(data){
            socket.room =data.room;
            socket.join(data.room);
        })
    })

    io.onconnection('connection', function(socket){
        socket.on('chatMessage', function(data){

            io.to(socket.room).emit('chatMessage', data);

        });

        socket.on('disconnect', function(){
            socket.leave(socket.room);
        })
    })
}