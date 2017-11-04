let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let unique_validator = require('mongoose-unique-validator');
const USER_CONST = require('../../config/constants/UserConstants');
const BcryptHelper = require('../../helpers/bcryptHelpers/bcryptHelper');

let UserSchema = new Schema({
    email: {
        type: String,
        required: 'email is required',
        unique: true,
        match: [USER_CONST.EMAIL_VALIDATION_REGEX, 'Please Enter Valid {PATH}']
    },
    password: {
        type: String,
        required: 'password is required'
        //match:[USER_CONST.PASSWORD_VALIDATION_REGEX,USER_CONST.PASSWORD_VALIDATION_MESSAGE]
    }
});
UserSchema.plugin(unique_validator, {
    type: 'unique',
    message: '{PATH} already exist'
});


UserSchema.pre('save', function (next) {
    let user = this;

    BcryptHelper.HashPassword(user.password, function (err, hashedPassword) {
        if (err) {
            return next(err);
        } else {
            user.password = hashedPassword;
            next();
        }
    });
});

module.exports = mongoose.model('User', UserSchema);