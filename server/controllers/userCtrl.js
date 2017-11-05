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
const passport = require('passport');


module.exports = function () {

    UserRouter.route('/Authenticate')
        .get(function (req, res, next) {
            if (req.user) {
                res.status(200).send();
            } else {
                res.status(401).send({
                    msg: "PLease login"
                });
            }

        });



    UserRouter.route('/Login')
        .post([check('email', 'PLease provide valid email').isEmail().trim().normalizeEmail(),
            check('password').exists(),
            sanitize('password').escape()
        ], function (req, res, next) {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                next({
                    status: 422,
                    message: {
                        err: errors.mapped()
                    }
                });
            } else {
                next();
            }
        }, function (req, res, next) {
            passport.authenticate('local-signin', function (err, user, info) {
                if (err) return next({
                    message: err
                });

                if (!user) {
                    return res.status(401).send({
                        msg: info.message
                    });
                }

                req.logIn(user, function (err) {
                    if (err) return next({
                        message: err
                    });

                    res.status(200).send({
                        msg: "logged in"
                    });
                });

            })(req, res, next);
        });


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
                let host_url=`${req.protocol}://${req.hostname}`;                
                UserService.save(req.body.email, req.body.password,host_url,function (err, result) {
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
                        token: errors.mapped().token.msg
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
                        res.status(result.status).send({msg:result.msg});
                    }
                });
            }

        });

    UserRouter.route('/LogOut')
        .post(function (req, res, next) {
            req.logout();
            res.status(200).send({
                msg: "Logged Out"
            });
        });
    return UserRouter;
}