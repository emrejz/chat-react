const passport = require("passport");
const User = require("../model/user");
const signUpStrategy = require("./signUpLocal");
const signInStrategy = require("./signInLocal");

passport.serializeUser(function(user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
  User.findById(user._id, function(err, user) {
    done(err, user);
  });
});
passport.use("local-signup", signUpStrategy);
passport.use("local-signin", signInStrategy);

module.exports = passport;
