const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 100, required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, minLength: 1, maxLength: 500, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Message", MessageSchema);
