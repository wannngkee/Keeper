const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

module.exports = mongoose.model("User", userSchema);

