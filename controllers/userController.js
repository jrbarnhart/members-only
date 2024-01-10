const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// User sign up get
exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
});

// User sign up post
exports.signup_post = asyncHandler(async (req, res, next) => {
  res.send("Sign up post");
});

// User log in get
exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login", { title: "Log In" });
});

// User log in post
exports.login_post = asyncHandler(async (req, res, next) => {
  res.send("Login post");
});
