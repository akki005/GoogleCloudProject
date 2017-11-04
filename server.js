const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serverCfg = require('./server/config/serverconfig/servercfg');
//const debug_req = require('debug')('Requests');
const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const MONGO_CONNECT = require('./server/helpers/mongoHelpers/mongoConnectHelper');
const cors = require('cors');

class Server {
    constructor() {
        this.initDB();
        this.setMiddleware();
        this.setStaticPath();
        this.setControllers();
        this.setErrorHandler();
        this.startServer();
    }

    initDB() {
        MONGO_CONNECT.initDB();
    }

    setMiddleware() {
        app.use(function(req,res,next){
            res.setHeader('Access-Control-Allow-Origin',"appspot.com");
            res.setHeader("Access-Control-Allow-Mehtods","GET,PUT,POST,DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.removeHeader('x-powered-by');
            next();
        });
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(expressValidator());
        app.use(cookieParser());
    }

    setControllers() {
        let UserCtrl = require('./server/controllers/userCtrl')();
        app.use('/user', UserCtrl);
    }



    setStaticPath() {
        app.use(express.static('.'));
        app.use(express.static('./public/'));
        app.use(morgan('short'));
    }

    setErrorHandler() {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500).send({
                msg: err.message
            });
        });
    }

    startServer() {
        app.listen(serverCfg.PORT, function (err) {
            if (err) console.log(err);
            debug_success('Listening on port %d', serverCfg.PORT);
        });
    }
}


new Server();