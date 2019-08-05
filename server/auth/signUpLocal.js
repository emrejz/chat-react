const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
module.exports = function() {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(user, done) {
    User.findById(user._id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        User.findOne({ email }, function(err, user) {
          console.log("email", email);
          console.log("password", password);
          console.log("done", done);
          console.log("user", user);
          // if there are any errors, return the error
          if (err) return done(err);

          // check to see if theres already a user with that email
          if (user) {
            return done(null, false);
          } else {
            // if there is no user with that email
            // create the user
            User({ email, password })
              .save()
              .then(user => {
                req.user = user;
                return done(null, user);
              })
              .catch(err => done(err));
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(email, password, done) {
        // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ "local.email": email }, function(err, user) {
          // if there are any errors, return the error before anything else
          if (err) return done(err);

          // if no user is found, return the message
          if (!user) return done(null, false); // req.flash is the way to set flashdata using connect-flash

          // if the user is found but the password is wrong
          if (!user.validPassword(password)) return done(null, false); // create the loginMessage and save it to session as flashdata

          // all is well, return successful user
          return done(null, user);
        });
      }
    )
  );
};
