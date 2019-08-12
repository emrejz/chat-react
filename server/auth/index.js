const passport = require("passport");
const User = require("../model/user");
const signUpStrategy = require("./signUpLocal");
const signInStrategy = require("./signInLocal");
const googleStrategy = require("./google");
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use("local-signup", signUpStrategy);
passport.use("local-signin", signInStrategy);
passport.use("google-plus-token", googleStrategy);

module.exports = passport;
