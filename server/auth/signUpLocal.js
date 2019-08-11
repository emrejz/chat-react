const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const emailValid = require("../validator/emailValid");
module.exports = new LocalStrategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: "email",
    passwordField: "password"
    // passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(email, password, done) {
    if (emailValid(email)) {
      User.findOne({ email })
        .lean()
        .exec((err, user) => {
          // if there are any errors, return the error
          if (err) return done("Database error.", null);

          // check to see if theres already a user with that email
          if (user) {
            return done("This email already exists.", false);
          } else {
            // if there is no user with that email
            // create the user
            password = password.trim();
            if (password.length >= 3 && password.length <= 10) {
              User({ email, password })
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
    } else return done("Please enter a valid email address.", null);
  }
);
