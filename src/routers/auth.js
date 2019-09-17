const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const express = require('express')
const bcryptSalt = 10;
const User = require("../models/user");
const router = express.Router();

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    username,
    password: hashPass
  })
  .then(() => {
    res.redirect("/");
  })
  .catch(error => {
    console.log(error);
  })
});

router.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": "error" });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

module.exports = router