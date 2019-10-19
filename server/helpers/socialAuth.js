const User = require("../model/user");

module.exports = user =>
  new Promise((resolve, reject) => {
    let { email, picture } = user;
    if (email && email.trim().length > 4) {
      User.findOne({ email })
        .lean()
        .exec((err, user) => {
          if (err) return reject(err);
          if (user) return resolve(user);
          else {
            let username =
              email.trim().split("@")[0] +
              "_" +
              Math.random()
                .toString(36)
                .substring(10);
            User({ username, picture, email })
              .save()
              .then(res => resolve(res))
              .catch(err => reject(err));
          }
        });
    } else return reject(new Error("Email is not valid"));
  });
