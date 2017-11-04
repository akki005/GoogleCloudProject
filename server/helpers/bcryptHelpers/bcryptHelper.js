const bcrypt = require('bcrypt');

class Bcrypt {
    constructor() {

    }

    HashPassword(password, cb) {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, hash);
            }
        });
    }

    ComparePassword(plainTextPassword, hashedPassword, cb) {
        bcrypt.compare(plainTextPassword, hashedPassword, function (err, match) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, match);
            }
        });
    }
}

module.exports = new Bcrypt();