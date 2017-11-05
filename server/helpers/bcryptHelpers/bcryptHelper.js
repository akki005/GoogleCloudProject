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
               return cb(err, null);
            } 
            if(!match){
                return cb(null,false);
            }
            if(match){
                return cb(null,true);
            }
        });
    }
}

module.exports = new Bcrypt();