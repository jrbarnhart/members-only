const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");

// User profile
exports.profile_get = asyncHandler(async (req, res, next) => {
  if (res.locals.currentUser) {
    res.render("user_profile", { title: "User Profile" });
  } else {
    res.render("login", { title: "Log In" });
  }
});

// User sign up GET
exports.signup_get = (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
};

// User sign up POST
exports.signup_post = [
  body("name_given")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("First name required")
    .isLength({ min: 1, max: 200 })
    .withMessage("First name must be 1-200 characters"),
  body("name_family")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("Last name required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Last name must be 1-200 characters"),
  body("username")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("Username required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Username must be 3-200 characters")
    .isEmail()
    .withMessage("Username must be an email")
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) throw new Error("Username/email already in use");
    })
    .withMessage("Username/email already in use"),
  body("password")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("Password required")
    .isLength({ min: 8, max: 200 })
    .withMessage("Password must be 8-200 characters"),
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
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          name_given: req.body.name_given,
          name_family: req.body.name_family,
          member_type: "basic",
        });

        await user.save();
        res.redirect("/");
      });
    }
  }),
];

// User log in GET
exports.login_get = (req, res, next) => {
  let failure;
  if (req.query.failure === "true") {
    failure = true;
  }
  res.render("login", { title: "Log In", failure: failure });
};

// User log in POST
exports.login_post = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/log-in?failure=true",
    })(req, res, next);
  },
];

// User log out POST
exports.logout_post = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// User upgrade GET
exports.upgrade_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/users/log-in");
  }
  res.render("upgrade_user", { title: "Upgrade Account" });
};

// User upgrade POST
exports.upgrade_post = [
  body("password").trim().escape(),

  asyncHandler(async (req, res, next) => {
    if (!res.locals.currentUser) {
      res.redirect("/users/log-in");
    }
    let successMessage = "Incorrect password";
    if (req.body.password === process.env.UPGRADE_SECRET_BASIC) {
      successMessage = "Account set to basic";
      await User.findByIdAndUpdate(res.locals.currentUser._id, {
        member_type: "basic",
      }).exec();
    }
    if (req.body.password === process.env.UPGRADE_SECRET_FULL) {
      successMessage = "Account set to full";
      await User.findByIdAndUpdate(res.locals.currentUser._id, {
        member_type: "full",
      }).exec();
    }
    if (req.body.password === process.env.UPGRADE_SECRET_ADMIN) {
      successMessage = "Account set to admin";
      await User.findByIdAndUpdate(res.locals.currentUser._id, {
        member_type: "admin",
      }).exec();
    }
    res.render("upgrade_user", {
      title: "Upgrade Account",
      successMessage: successMessage,
    });
  }),
];
