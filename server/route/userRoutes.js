let express = require('express');
let UserDataRouter = express.Router();
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
const userDataCtrl = require('../controllers/userDataCtrl')();
const passport = require('passport');


module.exports = function () {

    UserDataRouter.use(function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            next({
                status: 401,
                message: 'Unauthorized'
            });
        }
    });
    UserDataRouter.get('/userdata/profile', userDataCtrl.getProfile);

    return UserDataRouter;
};