const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

// Create message GET
router.get("/create-message", messageController.create_message_get);

// Create message POST

// Delete message POST

module.exports = router;
