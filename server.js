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


class Server {
    constructor() {
        //this.initDB();
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
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(expressValidator());        
        app.use(cookieParser());
        app.use(morgan('combined'));
    }

    setControllers() {
        let UserCtrl = require('./server/controllers/userCtrl')();
        app.use('/user', UserCtrl);
    }



    setStaticPath() {
        app.use(express.static('.'));
        app.use(express.static('./public/'));
    }

    setErrorHandler() {
    /*     app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }); */
        app.use(function (err, req, res, next) {
            //debug_err(err);
            res.status(err.status || 500).send(err.message);
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