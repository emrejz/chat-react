const mongoose = require("mongoose");
const Schma = mongoose.Schema;

const User = new Schma({
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", User);
