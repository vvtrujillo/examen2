const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del proyecto es requerido.'],
        minlength: [3, 'El largo minimo del nombre es de 3 caracteres.']
    },

    fechaVencimiento:{
        type: Date,
        required: [true, 'La fecha de vencimiento es requerida.']
    },

    estado: {
        type: String
    }
}, {timestamps: true})

const Proyecto = mongoose.model('Proyecto', ProyectoSchema);

module.exports=Proyecto;