const mongoose = require("mongoose");
const Schma = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");
const User = new Schma({
  email: String,
  // username: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});
User.plugin(findOrCreate);
module.exports = mongoose.model("user", User);
