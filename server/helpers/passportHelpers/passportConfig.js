const User = require('../../models/mongoModels/User');
const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
      //  debug_success("serialize user with id : %s",user._id);
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
       // debug_success("deserialize user with id : %s",id);        
        User.findById(id, function (err, user) {
            let user_object=user.toObject();
            delete user_object.password;
            done(err, user_object);
        });
    });
}