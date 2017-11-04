let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let unique_validator = require('mongoose-unique-validator');


let TokenSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 60 
    }
});


module.exports = mongoose.model('Token', TokenSchema);