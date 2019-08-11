const express = require("express");
const router = express.Router();
const passport = require("../auth/index");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", (req, res, next) => {
  if (!req.body.email) {
    res.json({ error: "Email boş", user: null });
  } else
    passport.authenticate("local-signup", function(err, user) {
      if (err) return res.json({ error: err });
      return res.json({ user });
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
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    console.log(user);
    if (!user) {
      console.log("Failed!");
    } else {
      req.login(user, function(err) {
        if (err) {
          console.log(err);
          return;
        }
        res.redirect("/");
      });
    }
  })(req, res, next);
});

router.get("/deneme", (req, res, next) => {
  if (req.user) {
    res.json({ message: "ok" });
  } else {
    res.json({ messge: "You must sign in/up to chat." });
  }

  res.json({ user: req.user, error: req.error });
});

module.exports = router;
