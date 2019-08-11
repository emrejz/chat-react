const Strategy = require("passport-local").Strategy;
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
            if (password === user.password) {
              delete user.password;
              req.user = user;
              return done(null, user);
              //} else return done(null, false, { message: "Wrong email." });
            } else return done("Wrong email.", false);
          }
        });
      // } else return done(null, null, { message: "Wrong email." });
    } else return done("Wrong email.", null);
  }
);
module.exports = signInStrategy;
