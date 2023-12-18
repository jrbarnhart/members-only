const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    minLength: 1,
    maxLength: 200,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  name_given: { type: String, minLength: 1, maxLength: 200, required: true },
  name_family: { type: String, minLength: 1, maxLength: 200, required: true },
  member_type: {
    type: String,
    enum: {
      values: ["basic", "member", "admin"],
      message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
    },
    required: true,
  },
});

UserSchema.virtual("full_name").get(function () {
  return `${this.name_given} ${this.name_family}`;
});

module.exports = mongoose.model("User", UserSchema);
