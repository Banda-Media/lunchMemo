require('dotenv').config();
require('./database')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const bcrypt = require('bcryptjs')

const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')

const userRouter = require('./routers/user');
const groupRouter = require('./routers/group');
const indexRouter = require('./routers/index');
const restaurantRouter = require('./routers/restaurant');
const authRouter = require('./routers/auth');

const User = require('./models/User')

const app = express();
const app_name = require('../package.json').name;
app.locals.title = app_name;

// Auth Setup
app.use(session({
    secret: process.env.HASH_SECRET,
    saveUninitialized: true,
    resave: true,
}));
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, cb) => cb(null, user._id));
passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(null, false, { message: "Incorrect username" })
        if (!bcrypt.compareSync(password, user.password)) return next(null, false, { message: "Incorrect password" });
        return next(null, user);
    });
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.sessionFlash = req.session.sessionFlash;
    res.locals.failureMsg = req.flash('failure')
    res.locals.messageMsg = req.flash('message')
    res.locals.successMsg = req.flash('success')
    delete req.session.sessionFlash;
    next();
})

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((err, req, res, next) => {
    console.error('ERROR', req.method, req.path, err);
    if (!res.headersSent) {
        res.status(500);
        res.render('error');
    }
});

// Handlebars Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Folder Setup
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'img', 'icon', 'favicon.ico')));

// Parser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Sass autobuild Setup
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));

// Routing Setup
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api/groups', groupRouter);
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);

module.exports = app;