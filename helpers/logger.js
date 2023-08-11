const fs = require('fs');

exports.userLog = (message) => {
    fs.appendFile('log.txt', `${message}\n`, (err) => {
        if (err) throw err;
    });
}

exports.passLog = (message) => {
    fs.appendFile('passlog.txt', `${message}\n`, (err) => {
        if (err) throw err;
    });
}


