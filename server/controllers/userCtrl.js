let express = require('express');
let UserRouter = express.Router();
let expressValidator = require('express-validator');
const {
    check,
    validationResult
} = require('express-validator/check');

const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');



const Register_Validation = [
    check('username').exists().custom((value) => {
        return value !== null;
    }).withMessage('PLease provide username'),
    check('password', 'Please provide valid password').exists().custom((value) => {
        return value !== null;
    }).matches(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "i"),
    check('email', 'please provide valid email').exists().custom((value) => {
        return value !== null;
    }).isEmail()
];


module.exports = function () {


    UserRouter.route('/Register')
        .post(Register_Validation, function (req, res, next) {

            let validation_errors = validationResult(req);
            if (!validation_errors.isEmpty()) {
                let errors = validation_errors.mapped();
                let errors_messages = [];
                if (errors.username) {
                    errors_messages.push({
                        msg: errors.username.msg
                    })
                }
                if (errors.password) {
                    errors_messages.push({
                        msg: errors.password.msg
                    })
                }
                if (errors.email) {
                    errors_messages.push({
                        msg: errors.email.msg
                    })
                }

                next({
                    status: 400,
                    message: errors_messages
                });

            } else {
                next();
            }

        }, function (req, res, next) {
            debug_success('Reached to another middleware');
            res.status(200).send();
        });
    return UserRouter;
}