var MongoClient = require('mongodb').MongoClient;
var config = require('../config');
var extrauri = (config.get('mongodb.username') && config.get('mongodb.password'))? config.get('mongodb.username') +":"+config.get('mongodb.password')+"@":""
extrauri = (extrauri.length >= 5)?extrauri:"";
var uri = 'mongodb://'+extrauri+config.get('mongodb.host')+'/'+config.get('mongodb.buckets.db');
var logger = require('./logger');
var db;


var conn = function (cb) {
	if(!db){
		MongoClient.connect(uri, function(err, cdb) {
			if(err){
				db = null
				console.log(err)
				logger.error("Not connect to mongo server at "+uri)
				cb(err,null);
				//return err;
			}else{
				logger.info("Connected correctly to mongo server at "+uri)				
				db = cdb;
				cb(null,db);
				//return db
			}
		});
	}else{
		//return db;
		cb(null,db);
	}
};

var parse = function (doc) {
    if (typeof doc.value === "object") {
        return doc.value;
    } else {
        return JSON.parse(doc.value);
    }
};

module.exports = {
    conn : conn,
    parse: parse
};
