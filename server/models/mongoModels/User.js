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
        lowercase: true,
        match: [USER_CONST.EMAIL_VALIDATION_REGEX, 'Please Enter Valid {PATH}']
    },
    password: {
        type: String,
        required: 'password is required'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profile: {
        name: {
            type: String,
            default: "User"
        },
        picture: {
            type: String,
            default: "/public/dist/images/user.png"
        },
        gender: String,
        age: Number
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