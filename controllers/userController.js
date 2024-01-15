const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// User sign up get
exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
});

// User sign up post
exports.signup_post = [
  body("name-given")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("First name required")
    .isLength({ min: 1, max: 200 })
    .withMessage("First name must be 1-200 characters")
    .escape(),
  body("name-family")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Last name required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Last name must be 1-200 characters")
    .escape(),
  body("username")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Username required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Username must be 3-200 characters")
    .isEmail()
    .withMessage("Username must be an email")
    .escape(),

  asyncHandler(async (req, res, next) => {}),
];

// User log in get
exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login", { title: "Log In" });
});

// User log in post
exports.login_post = asyncHandler(async (req, res, next) => {
  res.send("Login post");
});
