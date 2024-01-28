const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Message = require("../models/message");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let messages;
    if (res.locals.currentUser) {
      messages = await Message.find()
        .sort({ timestamp: -1 })
        .limit(10)
        .populate("author")
        .exec();
    } else {
      messages = await Message.find()
        .sort({ timestamp: -1 })
        .select("-author -timestamp")
        .limit(10)
        .exec();
    }
    res.render("index", { title: "Message Board", messages: messages });
  })
);

module.exports = router;
