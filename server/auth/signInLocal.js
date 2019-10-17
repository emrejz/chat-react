const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/user");

const signInStrategy = new Strategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  (username, password, done) => {
    if (username && username.trim().length > 2) {
      User.findOne({ username })
        .lean()
        .exec((err, user) => {
          if (err) return done("Database error.", null);
          if (!user) return done("Wrong username.", false);
          if (user) {
            bcrypt.compare(password, user.password, function(err, isMatch) {
              if (err) return done("Bcrypt error:" + err, false);
              if (isMatch) {
                delete user.password;
                return done(null, user);
              } else return done("Wrong password.", false);
            });
          }
        });
    } else
      return done("Username length can be between 3 and 20 characters.", null);
  }
);
module.exports = signInStrategy;
