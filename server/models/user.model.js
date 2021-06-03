const mongoose = require("mongoose");

noteSchema = new mongoose.Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  notes: [noteSchema],
});

module.exports = mongoose.model("User", userSchema);
