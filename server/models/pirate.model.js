const mongoose = require('mongoose');

const PirateSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del pirata es requerido.'],
        minlength: [3, 'El largo minimo del nombre es de 3 caracteres.']
    },
    crewposition: {
        type: String,
        required: [true, 'La posicion del pirata es requerida.']
    },
    linkimagen: {
        type: String,
        required: [true, 'La imagen del pirata es requerida.']
    },
    numcofres: {
        type: Number,
        required: [true, 'El numero de cofres es requerido.'],
        max:[999, 'El numero máximo es 999']
    },
    frase: {
        type: String,
        required: [true, 'La frase es requerida.'],
        minlength: [10, 'El largo de la frase debe ser de al menos 10 caracteres.']
    },
    pegleg: {
        type: Boolean
    },
    eyepatch: {
        type: Boolean
    },
    hookhand: {
        type: Boolean
    }
}, {timestamps: true})

const Pirate = mongoose.model('Pirate', PirateSchema);

module.exports=Pirate;