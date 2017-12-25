var q = require('q');
var uuid = require('node-uuid');
var db = require('./mongo-db');
var dbconn;
db.conn(function(err,db){
    if(!err){
        dbconn = db;
    }
});


var _find = function (selector,collectionName) {
    var deffered = q.defer();
    function innerQuery(){
        var collection = dbconn.collection(collectionName);
        collection.find(selector).toArray(function(err, docs) {
            if(err){
                deffered.reject(err);
            }else{
                if(docs.length){
                    deffered.resolve(docs);
                }else{
                  deffered.reject({});  
                }
                
            }
        })
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};

/*
    * data must be in array [{},{}]
*/
var _insert = function (data, collectionName) {
    var deffered = q.defer();
    function innerQuery(){
        var collection = dbconn.collection(collectionName);
        collection.insertMany(data, function(err, result) {
            if(err){
                deffered.reject(err);
            }else{
                deffered.resolve(true);
            }
          });
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};

var _delete = function (selector, collectionName) {
    var deffered = q.defer();
    function innerQuery(){
        var collection = dbconn.collection(collectionName);
        collection.remove(selector, function(err, result) {
            if(err){
                deffered.reject(err);
            }else{
                deffered.resolve(true);
            }
          });
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};
//_delete({},'student')
var _update = function (selector,set, collectionName) {
    var deffered = q.defer();
    function innerQuery(){
        var collection = dbconn.collection(collectionName);
        collection.updateMany(selector,set, function(err, result) {
            if(err){
                // console.log('err',err)
                deffered.reject(err);
            }else{
                // console.log('result',result)
                deffered.resolve(true);
            }
          });
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};

var _aggregate = function (selector,collectionName) {
    var deffered = q.defer();
    function innerQuery(){
        var collection = dbconn.collection(collectionName);
        collection.aggregate(selector).toArray(function(err, docs) {
            if(err){
                deffered.reject(err);
            }else{
                if(docs.length){
                    deffered.resolve(docs);
                }else{
                  deffered.reject({});  
                }
                
            }
        })
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};

var _getUUID = function () {
    return uuid.v4().replace(/\-/g,'');
};




module.exports = { 
    getUUID: _getUUID,
    find : _find,
    insert : _insert,
    delete : _delete,
    update : _update,
    aggregate : _aggregate
};
