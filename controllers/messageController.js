const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { decode } = require("html-entities");

const Message = require("../models/message");

// Create message get
exports.create_message_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/users/log-in");
  }
  res.render("create_message", { title: "Create Message" });
};
// Create message post
exports.create_message_post = [
  body("title")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("Title required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be 1-100 characters"),
  body("text")
    .trim()
    .escape()
    .exists({ values: "falsy" })
    .withMessage("Message text required")
    .isLength({ min: 1, max: 500 })
    .withMessage("Message text must be 1-500 characters"),

  asyncHandler(async (req, res, next) => {
    const validationErrors = validationResult(req);

    const formValues = {
      title: req.body.title,
      text: req.body.text,
    };

    if (!validationErrors.isEmpty()) {
      res.render("create_message", {
        title: "Create Message",
        formValues: formValues,
        errors: validationErrors.array(),
      });
    } else {
      const message = new Message({
        title: req.body.title,
        text: req.body.text,
        timestamp: new Date(),
        author: res.locals.currentUser._id,
      });
      await message.save();
      res.redirect("/");
    }
  }),
];
// Delete message get
exports.delete_message_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  const decodedMessage = {
    text: decode(message.text),
    title: decode(message.title),
  };
  res.render("delete_message", {
    title: "Delete Message?",
    message: message,
    decodedMessage: decodedMessage,
  });
});
// Delete message post
exports.delete_message_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
