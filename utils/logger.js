var winston = require('winston');
var morgan = require('morgan');
var config = require('../config');
winston.emitErrs = true;

// to log express request separatly
var httpLogger = new winston.Logger({
    transports: [new winston.transports.File({
            filename: config.get('logger.httpLogFileName'),
            json: true,
            maxsize: config.get('logger.logFileSize'),
            maxFiles: 5,
            colorize: true,
        })],
    exitOnError: false
});

// to log application exceptions
var logger = new winston.Logger({
    transports: [new winston.transports.File({
            filename: config.get('logger.logFileName'),
            json: true,
            maxsize: config.get('logger.logFileSize'),
            colorize: true,
        }), new winston.transports.Console({
            level: 'debug',
            json: true,
            colorize: true
        })],
    exceptionHandlers: [new winston.transports.File({
            filename: config.get('logger.exceptionLogFileName'),
            json: true,
            maxsize: config.get('logger.logFileSize'),
            colorize: true,
        })

    ],
    exitOnError: false
});

//winston file transport
var stream = {
    write: function (message, encoding) {
        httpLogger.info(message);
    }
};

// morgan for capture http logs
morgan.format('full', config.get('logger.httpLogFormat'))
logger.startHttpLogger = function () {
    return morgan('full', {
        stream: stream
    });
};

module.exports = logger;