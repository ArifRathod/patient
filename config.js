var convict = require('convict');

var config = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['live', 'local', 'dev'],
        default: 'live',
        env: 'NODE_ENV',
        arg: 'env'
    },
    cluster: {
        workerCount: {
            doc: 'No of worker of API',
            format: Number,
            default: 2
        }
    },
    server: {
        port: {
            doc: 'HTTP port to bind',
            format: 'port',
            default: 3001,
            env: 'PORT'
        },
        bodyParser: {
            limit: {
                doc: 'maximum request body size',
                format: String,
                default: '100kb'
            }
        }
    },
    logger: {
        httpLogFormat: {
            doc: 'HTTP log format',
            format: String,
            default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
        },
        httpLogFileName: {
            doc: 'HTTP log File name',
            format: String,
            default: 'http.log'
        },
        logFileName: {
            doc: 'Log File name',
            format: String,
            default: 'logs.log'
        },
        exceptionLogFileName: {
            doc: 'Exception log File name',
            format: String,
            default: 'exceptions.log'
        },
        logFileSize: {
            doc: 'logs File Max File size',
            format: Number,
            default: 5242880
        }
    },
    mongodb: {
        host: {
            doc: 'Mongodb host.',
            format: String,
            default: 'ds149207.mlab.com:49207',
        },
        buckets: {
            db: {
                doc: 'Database',
                format: String,
                default: 'googleimages'
            }
        },
        collections:{
            doc: '',
            format: Array,
            default: ['default']
        },
        username:{
            doc:'',
            format:String,
            default:''
        },
        password:{
            doc:'',
            format:String,
            default:''
        }
    }



});

config.loadFile('./config-' + config.get('env') + '.json');

config.set('logger.httpLogFileName', config.get('logger.path') + config.get('logger.httpLogFileName'));
config.set('logger.logFileName', config.get('logger.path') + config.get('logger.logFileName'));
config.set('logger.exceptionLogFileName', config.get('logger.path') + config.get('logger.exceptionLogFileName'));

// validate
config.validate();

module.exports = config;
