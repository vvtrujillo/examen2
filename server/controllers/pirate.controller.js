const Pirate = require('../models/pirate.model');

module.exports.listar = (req, res) => {
    Pirate.find().sort({nombre:1}) //para ordenar alfabeticamente
        .then(resp => {
            res.json({
                datosPirate: resp,
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
    Pirate.create(req.body)
        .then(resp => {
            res.json({
                datosPirate: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al crear Pirata.'
            })
        })
}

module.exports.eliminar = (req, res) => {
    Pirate.findByIdAndDelete(req.params.id)
        .then(resp => {
            res.json({
                error: false,
                mensaje: 'Se ha eliminado el pirata.'
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al eliminar Pirata.'
            })
        });
}

module.exports.listarPirata = (req,res) => {
    Pirate.findById(req.params.id)
        .then(resp => {
            res.json({
                error: false
            })            
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'No se puede obtener el pirata.'
            })
        });
}