const passport = require("passport");
const User = require("../model/user");
const signUpStrategy = require("./signUpLocal");
const signInStrategy = require("./signInLocal");
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use("local-signup", signUpStrategy);
passport.use("local-signin", signInStrategy);

module.exports = passport;
