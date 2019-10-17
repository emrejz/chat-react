const express = require("express");
const router = express.Router();
const passport = require("../auth/index");

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
router.get("/logout", (req, res, next) => {
  req.logout();
  res.json({ status: true });
});
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  function(req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);
module.exports = router;
