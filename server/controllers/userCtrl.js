let express = require('express');
let UserRouter = express.Router();
let expressValidator = require('express-validator');
const {
    check,
    validationResult
} = require('express-validator/check');
const {
    matchedData,
    sanitize
} = require('express-validator/filter');
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
                UserService.save(req.body.email, req.body.password, function (err, result) {
                    if (err) {
                        next({
                            status: err.status,
                            message: err.msg
                        });
                    } else {
                        res.status(201).send({
                            msg: "Your account has been created please verify your Email to activate account"
                        });
                    }
                });
            }
        });

    UserRouter.route('/verification')
        .post([check('token', 'Provide token').exists(),
            sanitize('token').escape()
        ], function (req, res, next) {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                next({
                    status: 422,
                    message: {
                        password: errors.mapped().password.msg
                    }
                });
            } else {
                UserService.VerifyEmail(req.body.token, function (err, result) {
                    if (err) {
                        next({
                            status: err.status,
                            message: err.msg
                        });
                    } else {
                        res.status(result.status).send(result.msg);
                    }
                });
            }

        });
    return UserRouter;
}