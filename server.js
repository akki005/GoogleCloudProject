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
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');

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
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(session({
            secret: serverCfg.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                ttl: serverCfg.SESSION_EXPIRATION_TIME
            }),
            cookie: {
                path: "/",
                httpOnly: true,
                secure: false
            },
            name: serverCfg.SESSION_ID_NAME
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        require('./server/helpers/passportHelpers/passportConfig')(passport);
        require('./server/helpers/passportHelpers/localStrategy')(passport);
        app.use(function (req, res, next) {
            //debug_success("session :: %O",req.session);
            //debug_success("session user :: %O",req.user);
            res.setHeader('Access-Control-Allow-Origin', "appspot.com");
            res.setHeader("Access-Control-Allow-Mehtods", "GET,PUT,POST,DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.removeHeader('x-powered-by');
            next();
        });
        app.use(expressValidator());
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