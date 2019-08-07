const express = require("express");
const router = express.Router();
const passport = require("../auth");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", (req, res, next) =>
  passport.authenticate("local-signup", function(err, user) {
    if (err) return res.json({ error: err });
    return res.json(user);
  })(req, res, next)
);

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.post("/signin", (req, res, next) =>
  passport.authenticate("local-signin", function(err, user) {
    if (err) return res.json({ error: err });
    return res.json(user);
  })(req, res, next)
);

module.exports = router;
