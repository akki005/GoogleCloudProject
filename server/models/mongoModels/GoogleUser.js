let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let unique_validator = require('mongoose-unique-validator');

let GoogleUserSchema = new Schema({
    _id: {
        type: String
    },
    email: {
        type: String,
        required: 'email is required',
        unique: true
    },
    profile: {
        name: {
            type: String,
            default: "User"
        },
        picture: {
            type: String,
        },
        gender: String,
        age: Number
    },
    token: {
        type: String
    }
});


module.exports = mongoose.model('GoogleUser', GoogleUserSchema);