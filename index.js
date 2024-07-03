const express = require('express');
const path = require('path');
require('dotenv').config();

//App de express
const app = express();

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/soket');

//Path Publico
 const publicPath = path.resolve(__dirname, 'public');

 app.use(express.static(publicPath));



server.listen(process.env.PORT, (err)=>{
    if(err) throw new error(err);

    console.log('Servidor corriendo satisfactoriamente en puerto !!!', process.env.PORT);

});