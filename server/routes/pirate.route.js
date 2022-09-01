const PirateController = require('../controllers/pirate.controller');
const { autenticar } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/v1/pirates', autenticar, PirateController.listar);
    app.post('/api/v1/pirates', autenticar, PirateController.crear);
    app.delete('/api/v1/pirates/:id', autenticar, PirateController.eliminar);
    app.get('/api/v1/pirates/:id', autenticar, PirateController.listarPirata);
}