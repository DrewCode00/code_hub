var express = require('express');
var path =require('path');
var cors = require('cors');
var http =require('http');
var errohandler =require('errohandller');
const errorHandler = require('errorhandler');
var ExpressPeerServer = require('peer').ExpressPeerServer;


var options ={
    debug: true,
    key:'code-hub'
};


var app = express();
var server = http.createServer(app);


var port = process.env.PORT || '3000';

app.set('port', port);

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/peerjs', ExpressPeerServer(server, options));

app.use(errorHandler());


process.on('uncaughtException', function (exc){
    console.error(exc);


});

server.listen(port);
