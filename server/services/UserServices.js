let mongoose = require('mongoose');
let User = require('../models/mongoModels/User');
const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');
const {
    ValidationError
} = require('../helpers/mongoHelpers/validationErrorHelper');
const BcryptHelper=require('../helpers/bcryptHelpers/bcryptHelper');

class UserSerivce {

    constructor() {

    }
    
    validateUserRegistrationInput(email, password, cb) {
        let newUser = new User({
            email: email,
            password: password
        });
        newUser.validate(function (err) {
            if (err) {
                let newvalidationError = new ValidationError(err);
                let err_msg = newvalidationError.getMessage();
                cb({
                    status: 400,
                    msg: err_msg
                }, null);
            } else {
                cb(null, true);
            }
        });
    }
    saveUser(email, password, cb) {
        let newUser = new User({
            email: email,
            password: password
        });
        newUser.save(function (err, user) {
            if (err) {
                if (err.name === "ValidationError") {
                    let newvalidationError = new ValidationError(err);
                    let err_msg = newvalidationError.getMessage();
                    cb({
                        status: 400,
                        msg: err_msg
                    }, null);
                } else {
                    cb({
                        status: 500,
                        msg: err
                    }, null);
                }
            } else {
                cb(null, user);
            }
        });
    }
}

module.exports = new UserSerivce();