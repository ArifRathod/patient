var constants = {
    messageKeys: {
        code_2000: 'Success',
        code_3001: 'already exist',
        code_5010: 'Error while performing opration',
        code_5011: 'Data not Found',
        code_5012: 'Id Required for this opration'

    },
    collections: {
        student: 'student'
    },
    
    regExp: {
        email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
    }

};

module.exports = constants;
