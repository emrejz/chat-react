const mongoose = require("mongoose");
const Schma = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcryptjs");
const User = new Schma({
  email: String,
  // username: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});
User.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
User.methods.comparePassword = function(candidatePassword, cb) {
  console.log(candidatePassword);
  var user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    console.log(err, isMatch);
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
User.plugin(findOrCreate);
module.exports = mongoose.model("user", User);
