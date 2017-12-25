var q = require('q');
var config = require('../config');
var constants = require('../utils/constants');
var model = require('./model');

var add = function (req, res) {    
    model.add(req.body,constants.collections.student).then(function (data) {
        return res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: data
        });
    }, function (error) {
        return res.status(500).send(error);
    });
    
};

var get = function (req, res) {
    var id =  req.params.id ?  req.params.id : null
    model.get(id,constants.collections.student).then(function (data) {                
        return res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: data
        });
    }, function (error) {
        return res.status(500).send(error);
    });
};

var update = function (req, res) {
    var id =  req.params.id ?  req.params.id : null
    if(id){
        model.update(req.body,id,constants.collections.student).then(function (data) {
            return res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: data
            });
            
        }, function (error) {
            return res.status(500).send(error);
        });
    }else{
        var errorCode = 5012;
        var error = new Error();
        error.code = errorCode;
        error.meg = constants.messageKeys['code_' + errorCode];
        return res.status(403).send(error);
    }   
};

var remove = function (req, res) {
    var id =  req.params.id ?  req.params.id : null
    if(id){
        model.remove(id,constants.collections.student).then(function (data) {
            return res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: data
            });
            
        }, function (error) {
            return res.status(500).send(error);
        });
    }else{
        var errorCode = 5012;
        var error = new Error();
        error.code = errorCode;
        error.meg = constants.messageKeys['code_' + errorCode];
        return res.status(403).send(error);
    }
};
module.exports = {
    add: add,
    get: get,
    update: update,
    remove:remove
};