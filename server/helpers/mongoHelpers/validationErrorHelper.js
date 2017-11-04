const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');


class ValidationError {

    constructor(error) {
        this.error = error;
    }

    getMessage() {
        let errors = {};
        for (const field in this.error.errors) {
            errors[field] = this.error.errors[field].message;
        }
        return errors;
    }

}


module.exports = {
    ValidationError
};