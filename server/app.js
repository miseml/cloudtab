const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');

const indexRouter = require('./routes');
const tabsRouter = require('./routes/tabs');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const connectionString = process.env.MONGODB || "mongodb://mongo:27017/test";

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    const db = client.db('cloud-tabs')

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(cors());
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());

    app.use('/', indexRouter);
    app.use('/tabs', tabsRouter(db));

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });

    // error handler
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
});

module.exports = app;
