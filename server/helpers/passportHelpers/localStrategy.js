const User = require('../../models/mongoModels/User');
const BcryptHelper = require('../bcryptHelpers/bcryptHelper');
let localStrategy = require('passport-local').Strategy;
const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');


module.exports = function (passport) {
    passport.use('local-signin', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, {
                    message: 'Email does not exist please register'
                });
            }

            if (!user.isVerified) {
                return done(null, false, {
                    message: 'Please verify your email'
                });
            }

            BcryptHelper.ComparePassword(password, user.password, function (err, match) {
                if (err) return done(err);
                if (!match) return done(null, false, {
                    message: 'Wrong password'
                });
                //delete user.password;
                if (match) return done(null, user);

            });
        });
    }));
}