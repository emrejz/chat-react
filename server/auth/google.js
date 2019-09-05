const GoogleStrategy = require("passport-google-oauth20");
const User = require("../model/user");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CB
  },
  function(accessToken, refreshToken, profile, next) {
    const { email, given_name, picture } = profile._json;

    const username =
      profile.name.givenName +
      "_" +
      Math.random()
        .toString(36)
        .substring(7);

    User.findOrCreate({ email }, { username, picture }, function(err, user) {
      return next(err, user);
    });
  }
);
