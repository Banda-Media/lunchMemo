const express = require('express');
const cors = require('cors');;
const hbs = require('hbs');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const userRouter = require('./routers/user');
const groupRouter = require('./routers/group');
const indexRouter = require('./routers/index');
const restaurantRouter = require('./routers/restaurant');
const authRouter = require('./routers/auth');

require('./db/database')
const app = express();

// Auth
passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
    User.findOne({ username }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(null, false, { message: "Incorrect username" });
        if (!bcrypt.compareSync(password, user.password)) return next(null, false, { message: "Incorrect password" });
        return next(null, user);
    });
}));
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api/group', groupRouter);
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);

module.exports = app;