const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Create message get
exports.create_message_get = (req, res, next) => {
  res.render("create_message", { title: "Create Message" });
};
// Create message post

// Delete message post
