var q = require('q');
var moment = require('moment');
var db = require('../utils/db');
var constants = require('../utils/constants');

var model = function () {

};

model.add = function (data,collectionName) {
    var deffered = q.defer();
    data.ID = db.getUUID();
    data.createdTimeStamp = moment.now();
    db.insert([data],collectionName).then(function (queryResult) {
        deffered.resolve({ID : data.ID});
    }, function (err) {
        var errorCode = 5010;
        var error = new Error();
        error.code = errorCode;
        error.msg = constants.messageKeys['code_' + 5010];
        deffered.reject(error);
    });
    return deffered.promise;
}

model.get = function (id,collectionName) {
    var deffered = q.defer();
    var query = id ? {ID : id}: {}
    db.find(query,collectionName).then(function (queryResult) {
        deffered.resolve(queryResult);
    }, function (err) {
        var errorCode = 5011;
        var error = new Error();
        error.code = errorCode;
        error.msg = constants.messageKeys['code_' + 5011];
        deffered.reject(error);
    });
    return deffered.promise;
}

model.update = function (data,id,collectionName) {
    var deffered = q.defer();
    data.updatedTimeStamp = moment.now();
    db.find({ID:id},collectionName).then(function (queryResult) {
        db.update({ID:id},{ $set: data },collectionName).then(function (updateResult) {
            deffered.resolve({ID:id});
        },function(err){
            var errorCode = 5010;
            var error = new Error();
            error.code = errorCode;
            error.msg = constants.messageKeys['code_' + 5010];
            deffered.reject(error);
        })
    }, function (err) {
        var errorCode = 5011;
        var error = new Error();
        error.code = errorCode;
        error.msg = constants.messageKeys['code_' + 5011];
        deffered.reject(error);
    });
    return deffered.promise;
}

model.remove = function (id,collectionName) {
    var deffered = q.defer();
    db.find({ID:id},collectionName).then(function (queryResult) {
        db.delete({ID:id},collectionName).then(function (updateResult) {
            deffered.resolve({ID:id});
        },function(err){
            var errorCode = 5010;
            var error = new Error();
            error.code = errorCode;
            error.msg = constants.messageKeys['code_' + 5010];
            deffered.reject(error);
        })
    }, function (err) {
        var errorCode = 5011;
        var error = new Error();
        error.code = errorCode;
        error.msg = constants.messageKeys['code_' + 5011];
        deffered.reject(error);
    });
    return deffered.promise;
}

module.exports = model;