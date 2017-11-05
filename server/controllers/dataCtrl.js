let express = require('express');

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


module.exports=function(){
    
    DataRouter.use(function(req,res,next){
        
    });


    DataRouter.route('/')
    .get()
    
    
    
    
    return DataRouter;
}