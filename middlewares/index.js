var bodyParser = require('body-parser');
var config = require('../config');

module.exports = function (app, express, root) {
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: config.get('server.bodyParser.limit')
    }));
    app.use(bodyParser.json({
        limit: config.get('server.bodyParser.limit')
    }));
    app.use(express.static(approot + '/public'));
    
};