const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", (req, res, next) => {
  if (res.locals.currentUser) {
    res.redirect(res.locals.currentUser.url);
  } else {
    res.redirect("/users/log-in");
  }
});

// Sign up
router.get("/sign-up", userController.signup_get);
router.post("/sign-up", userController.signup_post);

// Log in
router.get("/log-in", userController.login_get);
router.post("/log-in", userController.login_post);

//Log out
router.get("/log-out", userController.logout_get);

// Upgrade
router.get("/upgrade", userController.upgrade_get);
router.post("/upgrade", userController.upgrade_post);

// User Profile
router.get("/:id", userController.profile_get);

module.exports = router;
