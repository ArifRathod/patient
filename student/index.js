var service = require('./service');
module.exports = function (app) {
    app.get('/student/', service.get);
    app.get('/student/:id', service.get);
    app.post('/student', service.add);
    app.put('/student/:id', service.update);
    app.delete('/student/:id', service.remove);
};