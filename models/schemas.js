var util = require('util');
var Validator = require('jsonschema').Validator;
var logger = require('../utils/logger');
var constants = require('../utils/constants');
var _validator = new Validator();
var schemas = function() {};

schemas.login = {
    'id': '/login',
    'type': 'object',
    'properties': {
        'email': {
            'type': 'string',
            'pattern': constants.regExp.email,
            'required': true
        },
        'password': {
            'type': 'string',
            'required': true
        }
    }
};

// Login response schema
schemas.loginResponse = {
    'id': '/loginResponse',
    'type': 'object',
    'properties': {
        'email': {
            'type': 'string',
            'pattern': constants.regExp.email,
            'required': true
        },
        'emailSalt': {
            'type': 'string',
            'required': true
        },
        'lName': {
            'type': 'string',
            'required': true
        },
        'fName': {
            'type': 'string',
            'required': true
        },
        "userType": {
            'type': 'number',
            'required': true
        }
    }
};

_validator.addSchema(schemas.login, '/login');
schemas.validate = function(object, schema) {
    var errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};
module.exports = schemas;