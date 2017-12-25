GLOBAL.approot = __dirname; 

var http = require('http');
var express = require('express');
var util = require('util');
var config = require('./config');
var logger = require('./utils/logger');
var middlewares = require('./middlewares/index');
var routes = require('./routes/index');
var constants = require('./utils/constants');
var app = express();


middlewares(app, express, __dirname);
routes(app);

app.set('port', config.get('server.port'));
http.createServer(app).listen(app.get('port'), function () {
    logger.info(util.format('API server started with process :%s and Running on :%s port', process.pid, app.get('port')));
    logger.info(util.format('Environment:%s', config.get('env')));
});

app.use(function (err, req, res, next) {
    logger.error(util.format('Uncaught exception caught, error:- %s', err.stack));
    return res.status(500).send({
        code: 5002,
        messageKey: constants.messageKeys.code_5002,
        data: {}
    });
});