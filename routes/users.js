var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/sign-up", (req, res, next) => {
  res.send("user sign up form");
});
router.post("/sign-up", (req, res, next) => {
  res.send("user sign up form post");
});

router.get("/log-in", (req, res, next) => {
  res.send("user login");
});

module.exports = router;
