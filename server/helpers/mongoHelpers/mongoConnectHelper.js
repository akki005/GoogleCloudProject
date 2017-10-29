let mongoose = require('mongoose');
let {
    USERNAME,
    PASSWORD,
    HOST,
    PORT,
    DB
} = require('../../config/dbconfig/mongo').MONGO_CFG;
const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');


class Mongo {
    constructor() {
        this.connection_string = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB}`;
    }

    initDB() {
        mongoose.connect(this.connection_string,{ useMongoClient: true }, function (err) {
            if (err) {
                debug_err('Error while connecting db : %O',err);
               // console.log(err);
            } else {
                debug_success('connected to db');
            }
        });
    }
}

module.exports = new Mongo();