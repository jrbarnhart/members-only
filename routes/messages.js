const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

//Default route
router.get("/", (req, res, next) => {
  res.redirect("/");
});

// Create message
router.get("/create-message", messageController.create_message_get);
router.post("/create-message", messageController.create_message_post);

// Delete message
router.post(
  "/delete-message/:id/confirm",
  messageController.delete_message_post
);
router.get("/delete-message/:id", messageController.delete_message_get);

module.exports = router;
