const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("User profile NYI");
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

module.exports = router;
