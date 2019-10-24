require('dotenv').config();
require('./database')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const logger = require('morgan');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')

const User = require('./models/user')

const app = express();
const app_name = require('../package.json').name;
app.locals.title = app_name;

app.use(sslRedirect());

// Auth Setup
app.use(session({
    secret: process.env.HASH_SECRET || 'insecure-secret',
    saveUninitialized: true,
    resave: true,
}));
passport.serializeUser((user, cb) => cb(null, user._id));

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

passport.use(new LocalStrategy({usernameField: 'email'}, (username, password, next) => {
    User.findOne({ email: username }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(null, false, { message: "Incorrect username" })
        if (user.validPassword(password)) return next(null, false, { message: "Incorrect password" });
        return next(null, user);
    });
}));
app.use(passport.initialize())
app.use(passport.session())


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

// Sass auto build Setup
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));

// Routing Setup
app.use('/', require('./routers/index'));
app.use('/', require('./routers/auth'));
app.use('/api/groups', require('./routers/group'));
app.use('/api/user', require('./routers/user'));
app.use('/api/restaurant', require('./routers/restaurant'));

module.exports = app;