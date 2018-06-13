const BcryptHelper = require('../bcryptHelpers/bcryptHelper');
let localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../../models/mongoModels/User');
const GoogleUser = require('../../models/mongoModels/GoogleUser');


const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');

module.exports = function (passport) {

    const PassportConfig = require('../../config/passportconfig/passportCfg');

    passport.use('local-signin', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({
            'email': email
        }, {
            'password': 1,
            'isVerified': 1
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
                let user_object = user.toObject();
                delete user_object.password;
                user_object.type = 'local';
                if (match) return done(null, user_object);

            });
        });
    }));

    /**
     * Google Strategy
     *  
     */
    passport.use(new GoogleStrategy({
        clientID: PassportConfig.google.clientID,
        clientSecret: PassportConfig.google.clientSecret,
        callbackURL: PassportConfig.google.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        // debug_success("user profile :: %O", profile);
        // debug_success("access token :: %O", accessToken);

        process.nextTick(function () {

            GoogleUser.findOne({
                '_id': profile.id
            }, {
                'token': 0,
            }, function (err, user) {
                if (err) {
                    return done(err, null, {
                        message: err
                    });
                }
                if (user) {
                    let googleUserObject = user.toObject();
                    googleUserObject.type = 'google';
                    return done(null, googleUserObject);
                }

                if (!user) {
                    let newGoogleUser = new GoogleUser();
                    newGoogleUser._id = profile.id;
                    newGoogleUser.email = profile.emails[0].value;
                    newGoogleUser.profile.name = profile.displayName;
                    newGoogleUser.profile.picture = profile.photos[0].value;
                    newGoogleUser.token = accessToken;
                    newGoogleUser.save(function (err, user) {
                        if (err) {
                            return done(err, null, {
                                message: err
                            });
                        }
                        let googleUserObject = {
                            _id: user._id,
                            type: 'google'
                        }
                        return done(null, googleUserObject);
                    });

                }
            });
        });

    }));
};