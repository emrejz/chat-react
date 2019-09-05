const express = require("express");
const router = express.Router();
const passport = require("../auth/index");

router.post("/signup", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return res.json(err);
    }

    req.login(user, function(err) {
      if (err) {
        return res.json(err);
      }
      console.log(user);
      console.log(req.isAuthenticated());
      console.log(req.user);
      return res.json(user);
    });
  })(req, res, next);
});
router.get("/signin", (req, res) => {
  res.json({ user: req.user, error: req.error });
});
router.post("/signin", function(req, res, next) {
  passport.authenticate("local-signin", (err, user, info) => {
    if (user) {
      return req.logIn(user, err => res.json({ error: err, user }));
    }
    return res.json({ error: err, user }); // continue to next middleware if no error.
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
    res.redirect("http://localhost:3000/chat");
  }
);
module.exports = router;
