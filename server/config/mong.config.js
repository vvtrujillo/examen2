const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/examen2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a la BD'))
    .catch(error => console.error('Ocurrio un error con la bd', error));