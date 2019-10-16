const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
module.exports = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  function(username, password, done) {
    if (username && username.trim().length > 2) {
      User.findOne({ username })
        .lean()
        .exec((err, user) => {
          if (err) return done("Database error.", null);
          if (user) {
            return done("This username already exists.", false);
          } else {
            if (
              password &&
              password.trim().length >= 3 &&
              password.trim().length <= 10
            ) {
              User({ username, password })
                .save()
                .then(user => {
                  delete user._doc.password;
                  return done(null, user);
                })
                .catch(err => done(err, null));
            } else
              return done(
                "Password length can be between 3 and 10 characters.",
                null
              );
          }
        });
    } else return done("Please enter a valid username.", null);
  }
);
