const PirateController = require('../controllers/pirate.controller');

module.exports = (app) => {
    app.get('/api/v1/pirates', PirateController.listar);
    app.post('/api/v1/pirates', PirateController.crear);
    app.delete('/api/v1/pirates/:id', PirateController.eliminar);
}