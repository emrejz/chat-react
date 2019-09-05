const passport = require("passport");
const User = require("../model/user");
const signUpStrategy = require("./signUpLocal");
const signInStrategy = require("./signInLocal");
const googleStrategy = require("./google");
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User.findById(user._id, function(err, user) {
    done(err, user);
  });
});
passport.use("local", signUpStrategy);
passport.use("local-signin", signInStrategy);
passport.use("google", googleStrategy);

module.exports = passport;
