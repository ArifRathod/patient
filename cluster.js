var cluster = require('cluster');
var util = require('util');
var config = require('./config');
var logger = require('./utils/logger');
var workerCount = config.get('cluster.workerCount');
cluster.setupMaster({ exec: 'API_App.js' });
function numWorkers() { return Object.keys(cluster.workers).length; }
var stopping = false;
function forkNewWorkers() {
    if (!stopping) {
        for (var i = numWorkers(); i < workerCount; i++) { cluster.fork(); }
    }
}
var workersToStop = [];
function stopWorker(worker) {
    logger.info(util.format('stopping worker pid:%s', worker.process.pid));
    worker.disconnect();
    var killTimer = setTimeout(function () {
        worker.kill();
    }, 60000);
    killTimer.unref();
}
function stopNextWorker() {
    var i = workersToStop.pop();
    var worker = cluster.workers[i];
    if (worker) stopWorker(worker);
}
function stopAllWorkers() {
    stopping = true;
    logger.info('stopping all workers');
    for (var id in cluster.workers) {
        stopWorker(cluster.workers[id]);
    }
}
cluster.on('listening', stopNextWorker);
cluster.on('disconnect', forkNewWorkers);
process.on('SIGHUP', function () {
    logger.info('restarting all workers');
    workersToStop = Object.keys(cluster.workers);
    stopNextWorker();
});
process.on('SIGTERM', stopAllWorkers);
forkNewWorkers();
logger.info(util.format('api master started with pid:%s', process.pid));