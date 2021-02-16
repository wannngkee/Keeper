const mongoose = require("mongoose");

noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [noteSchema],
});

module.exports = mongoose.model("User", userSchema);

