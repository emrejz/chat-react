const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../model/user");

module.exports = new GooglePlusTokenStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CB
  },
  function(accessToken, refreshToken, profile, next) {
    const email = profile.emails[0].value;
    console.log(email);
    // const username =
    //   profile.name.givenName +
    //   "_" +
    //   Math.random()
    //     .toString(36)
    //     .substring(7);
    User.findOrCreate({ email }, function(err, user) {
      console.log(err);
      console.log(user);
      return next(err, user);
    });
  }
);
