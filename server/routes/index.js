const express = require("express");
const router = express.Router();
const passport = require("../auth/index");
const socialAuth = require("../helpers/socialAuth");

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
    // TODO RES REDIRECT REQ.URL
    res.json({ status: "okkk" });
  }
);
router.get("/signout", (req, res) => {
  req.logout();
  res.json({ status: true });
});
router.post("/isSocial", async (req, res) => {
  const data = req.body;
  try {
    const user = await socialAuth(data);
    req.logIn(user, error => {
      if (error) return res.json({ error });
      else return res.json({ user });
    });
  } catch (error) {
    return res.json(error);
  }
});
module.exports = router;
