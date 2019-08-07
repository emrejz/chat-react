const Strategy = require("passport-local");
const User = require("../model/user");
const emailValid = require("../validator/emailValid");

const signInStrategy = new Strategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    if (emailValid(email)) {
      User.findOne({ email })
        .lean()
        .exec((err, user) => {
          if (err) return done(err, null);
          if (!user) return done("Wrong email.", false);
          if (user) {
            if (password === user.password) {
              delete user.password;
              req.user = user;
              return done(null, user);
            } else return done("Wrong password.", false);
          }
        });
    } else return done("Please enter a valid email address.", null);
  }
);
module.exports = signInStrategy;
