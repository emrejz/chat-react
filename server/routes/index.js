const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../auth/signUpLocal")(passport);
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/index", (req, res) => {
  console.log(req.user);

  res.json(req.user);
});
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/chat",
    failureRedirect: "/signup"
  })
);
router.get("/chat", (req, res) => {
  if (req.user) res.json(req.user);
  else res.redirect("/signup");
});
module.exports = router;
