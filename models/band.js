const { v4 : unidadV4 } = require('uuid');

class Band{
    constructor(name = 'no-name'){
        this.id = unidadV4(); // Crea identificador unico con el paquete UUID
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;