const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

// User sign up get
exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
});

// User sign up post
exports.signup_post = [
  body("name_given")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("First name required")
    .isLength({ min: 1, max: 200 })
    .withMessage("First name must be 1-200 characters")
    .escape(),
  body("name_family")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Last name required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Last name must be 1-200 characters")
    .escape(),
  body("username") // TODO - Add custom validator for unique usernames
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Username required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Username must be 3-200 characters")
    .isEmail()
    .withMessage("Username must be an email")
    .escape(),
  body("password")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Password required")
    .isLength({ min: 8, max: 200 })
    .withMessage("Password must be 8-200 characters")
    .escape(),
  body("confirm_password")
    .trim()
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),

  asyncHandler(async (req, res, next) => {
    const validationErrors = validationResult(req);

    const formValues = {
      name_given: req.body.name_given,
      name_family: req.body.name_family,
      username: req.body.username,
    };

    if (!validationErrors.isEmpty()) {
      res.render("signup", {
        title: "Sign Up",
        formValues: formValues,
        errors: validationErrors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        // No errors so create and save user w/ encrpted pw
      });
    }
  }),
];

// User log in get
exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login", { title: "Log In" });
});

// User log in post
exports.login_post = asyncHandler(async (req, res, next) => {
  res.send("Login post");
});
