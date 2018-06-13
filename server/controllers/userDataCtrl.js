let express = require('express');
let HTTP_STATUS = require('http-status');
let DataRouter = express.Router();

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
const User = require('../models/mongoModels/User');
const GoogleUser = require('../models/mongoModels/GoogleUser');

module.exports = function () {

    return {
        getProfile: getProfile
    };

    function getProfile(req, res, next) {
        if (req.user.type === 'google') {
            GoogleUser.findById(req.user._id, {
                'profile': 1,
                '_id': 0,
            }, function (error, user) {
                if (error) {
                    next({
                        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                        message: HTTP_STATUS[500]
                    })
                } else {
                    res.status(HTTP_STATUS.OK).send(user);
                }
            });

        } else if (req.user.type === 'local') {
            User.findById(req.user._id, {
                'profile': 1,
                '_id': 0,
            }, function (error, user) {
                if (error) {
                    next({
                        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                        message: HTTP_STATUS[500]
                    })
                } else {
                    res.status(HTTP_STATUS.OK).send(user);
                }
            });
        }
    }





}