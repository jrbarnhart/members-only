const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    minLength: 1,
    maxLength: 200,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 200,
    required: true,
  },
  name_given: { type: String, minLength: 1, maxLength: 200, required: true },
  name_family: { type: String, minLength: 1, maxLength: 200, required: true },
  member_type: {
    type: String,
    enum: {
      values: ["basic", "full", "admin"],
      message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
    },
    required: true,
  },
});

UserSchema.virtual("full_name").get(function () {
  return `${this.name_given} ${this.name_family}`;
});

UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
