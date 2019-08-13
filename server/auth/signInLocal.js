const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const emailValid = require("../validator/emailValid");

const signInStrategy = new Strategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    if (emailValid(email)) {
      User.findOne({ email })
        .lean()
        .exec((err, user) => {
          if (err) return done("Database error.", null);
          //  if (err) return done(null, null, { message: "Database error." });
          if (!user) return done("Wrong email.", false);
          //if (!user) return done(null, false, { message: "Wrong email." });
          if (user) {
            bcrypt.compare(password, user.password, function(err, isMatch) {
              if (err) return done("Bcrypt error:" + err, false);
              if (isMatch) {
                delete user.password;
                req.user = user;
                return done(null, user);
                //} else return done(null, false, { message: "Wrong email." });
              } else return done("Wrong password.", false);
            });
          }
        });
      // } else return done(null, null, { message: "Wrong email." });
    } else return done("Please enter a valid email address.", null);
  }
);
module.exports = signInStrategy;
