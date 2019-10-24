const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport')
const auth = require('../middleware/auth')

router.get('/signup', (req, res, next) => {
    res.render('users/signup')
});

router.post('/signup', (req, res, next) => {
    const userData = {
        password: User.generateHash(req.body.password),
        email: req.body.email,
        name: req.body.name
    }

    User.create(userData)
        .then(user => {
            req.session.currentUser = user
            req.logIn(user, (err) => {
                if (!err) req.flash('success', 'Registered and logged in!');
                else next(err)
            })
            res.status(201).json(user)
        })
        .catch(e => {
            console.log(e)
            res.status(500).send(e)
        })
});

router.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            req.flash('failure', `${info.message}`);
            return res.status(500).json(info.message);
        }
        
        if (!user) {
            req.flash('failure', `User credentials not found.`);
            return res.status(404).send(`User credentials not found. ${info.message}`);
        }

        req.logIn(user, function(err) {
            if (err) {
                req.flash('failure', `${info.message}`);
                return next(err);
            }
            req.flash('success', 'Successfully logged in!');
            return res.status(200).json(user);
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.flash('success', 'Logged out!');
    req.logout();
    res.redirect('/');
})

router.get('/messages', auth, (req, res, next) => {
    res.render('users/messages', { user: req.user })
})

module.exports = router