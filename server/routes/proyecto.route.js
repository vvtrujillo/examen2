const ProyectoController = require('../controllers/proyectos.controller');

module.exports = (app) => {
    app.get('/api/v1/proyectos', ProyectoController.listar);
    app.post('/api/v1/proyectos', ProyectoController.crear);
    app.put('/api/v1/proyectos/:id', ProyectoController.actualizar);
    app.delete('/api/v1/proyectos/:id', ProyectoController.eliminar);

    app.get('/api/v1/proyectosCreados',ProyectoController.listarCreados);
    app.get('/api/v1/proyectosEjecucion',ProyectoController.listarEjecucion);
    app.get('/api/v1/proyectosTerminados',ProyectoController.listarTerminados);
}