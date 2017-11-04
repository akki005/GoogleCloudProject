let express = require('express');
let UserRouter = express.Router();
let expressValidator = require('express-validator');
const {
    check,
    validationResult
} = require('express-validator/check');

const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');
const UserService = require('../services/UserServices');
const USER_CONST = require('../config/constants/UserConstants');

module.exports = function () {

    UserRouter.route('/Register')
        .post([check('password', USER_CONST.PASSWORD_VALIDATION_MESSAGE).matches(USER_CONST.PASSWORD_VALIDATION_REGEX)], function (req, res, next) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                next({
                    status: 422,
                    message: {
                        password: errors.mapped().password.msg
                    }
                });
            } else {
                UserService.saveUser(req.body.email, req.body.password, function (err, result) {
                    if (err) {
                        next({
                            status: err.status,
                            message: err.msg
                        });
                    } else {
                        res.status(201).send();
                    }
                });
            }
        });
    return UserRouter;
}