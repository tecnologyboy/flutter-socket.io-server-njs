const { Socket } = require('socket.io');
const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

console.clear();

const bands = new Bands;

console.log('Init Server');


bands.addBand(new Band('Oasis'));
bands.addBand(new Band('Hilsong'));
bands.addBand(new Band('Tercer Cielo'));
bands.addBand(new Band('Redimidos Squad'));
bands.addBand(new Band('Puperto y su guitarra'));

console.log(bands);

//Mensajes de Sockets
io.on('connection', client=>{
    console.log('Cliente Connectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', ()=>{
        console.log('Cliente Desconectado');
    });

    client.on('mensaje' , (payload)=>{

        console.log('Mensaje', payload)

        io.emit('mensaje', {administrator: 'New Messaje'});

    });


    client.on('vote-band', (payload) => {// a todos menos al que esta emitiendo

        bands.voteBand(payload.id)
        
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {// a todos menos al que esta emitiendo

        const newBand = new Band(payload.name);
        
        bands.addBand(newBand);
        
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {// a todos menos al que esta emitiendo

        //console.log('Id: ', payload.id);

         bands.deleteBand(payload.id);
        
         io.emit('active-bands', bands.getBands());
    });

    client.on('emit-messaje', (payload) => {

        //io.emit('new-messaje', payload); //esto emite a todos
        //socket.broadcast.emit('new-messaje', payload);// a todos menos al que esta emitiendo

        client.broadcast.emit('new-messaje', payload);
        
        io.emit('active-bands', bands.getBands());
    });
});