const express = require("express");
const router = express.Router();
const passport = require("../auth/index");
const User = require("../model/user");

router.post("/signup", function(req, res, next) {
  passport.authenticate("local-signup", (error, user) => {
    if (user)
      req.logIn(user, error => {
        if (error) return res.json({ error });
        else return res.json({ user });
      });
    if (error) res.json({ error });
  })(req, res, next);
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local-signin", (error, user) => {
    if (user)
      req.logIn(user, error => {
        if (error) return res.json({ error });
        else return res.json({ user });
      });
    if (error) res.json({ error });
  })(req, res, next);
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_URL);
  }
);
module.exports = router;
