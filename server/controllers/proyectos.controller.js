const Proyecto = require('../models/proyecto.model');

module.exports.listar = (req, res) => {
    Proyecto.find()
        .then(resp => {
            res.json({
                datosProy: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al rescatar la información.'
            })
        });
}


module.exports.crear = (req, res) => {
    Proyecto.create(req.body)
        .then(resp => {
            res.json({
                datosProy: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al crear.'
            })
        });
}

module.exports.actualizar = (req, res) => {
    Proyecto.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        .then(resp => {
            res.json({
                datosProy: req.datos,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al actualizar.'
            })
        });
}

module.exports.listarCreados = (req, res) => {
    Proyecto.find({estado:'creado'})
        .then(resp => {
            res.json({
                datosProy: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al rescatar la información.'
            })
        });
}

module.exports.listarEjecucion = (req, res) => {
    Proyecto.find({estado:'ejecucion'})
        .then(resp => {
            res.json({
                datosProy: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al rescatar la información.'
            })
        });
}

module.exports.listarTerminados = (req, res) => {
    Proyecto.find({estado:'terminado'})
        .then(resp => {
            res.json({
                datosProy: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al rescatar la información.'
            })
        });
}

module.exports.eliminar = (req, res) => {
    Proyecto.findByIdAndDelete(req.params.id)
        .then(resp => {
            res.json({
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error'
            })
        });
}
