const User = require('../../models/mongoModels/User');
const GoogleUser = require('../../models/mongoModels/GoogleUser');
const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        //  debug_success("serialize user with id : %s",user._id);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        // debug_success("deserialize user with id : %s",id);  
        if (user.type === 'local') {
            User.findById(user._id, {
                'password': 0
            }, function (err, user) {
                if (err) return done(err, null);
                done(null, user);
            });
        } else if (user.type === 'google') {
            GoogleUser.findById(user._id, {
                'token': 0
            }, function (err, user) {
                if (err) return done(err, null);
                done(null, user);
            });
        }

    });
}