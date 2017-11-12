let mongoose = require('mongoose');
let User = require('../models/mongoModels/User');
let Token = require('../models/mongoModels/Token');

const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');
const {
    ValidationError
} = require('../helpers/mongoHelpers/validationErrorHelper');
const Mailer = require('../helpers/MailHelpers/Transporter');
const BcryptHelper = require('../helpers/bcryptHelpers/bcryptHelper');
const crypto = require('crypto');
const Messages = require('../config/constants/Messages');

module.exports.VerifyEmail = function (token, cb) {
    Token.findOne({
        token: token
    }, function (err, token) {
        if (err) return cb({
            status: 500,
            msg: err
        }, null);

        if (!token) return cb({
            status: 404,
            msg: Messages.INVALID_VERIFICATION_TOKEN
        }, null);

        User.findOne({
            _id: token._userId
        }, function (err, user) {
            if (err) return cb({
                status: 500,
                msg: err
            }, null);

            if (!user) return cb({
                status: 404,
                msg: Messages.INVALID_VERIFICATION_TOKEN
            }, null);
            if (user.isVerified) return cb(null, {
                status: 200,
                msg: Messages.EMAIL_ALREADY_VERIFIED
            });

            User.update({
                _id: user._id
            }, {
                $set: {
                    isVerified: true
                }
            }, function (err) {
                if (err) return cb({
                    status: 500,
                    msg: err
                }, null);
                cb(null, {
                    status: 200,
                    msg: Messages.EMAIL_VERIFIED
                });
            });
        });
    });
};



module.exports.save = function (email, password, host_url, cb) {
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
            var token = new Token({
                _userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            });

            token.save(function (err, token) {
                if (err) {
                    cb({
                        status: 500,
                        msg: err
                    }, null);
                } else {
                    Mailer.sendMail(user.email, token.token, host_url, function (err, done) {
                        if (err) {
                            cb({
                                status: 500,
                                msg: err
                            }, null);
                        } else {
                            cb(null, user);
                        }
                    });
                }
            });
        }
    });
}

module.exports.validateUserRegistrationInput = function (cb) {
    let newUser = new User({
        email: this.email,
        password: this.password
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