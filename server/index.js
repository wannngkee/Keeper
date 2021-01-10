const express = require("express");
const bodayParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(bodayParser.urlencoded({ extended: true }));
app.use(cors);
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/keeper", { useNewUrlParser: true });
const noteSchema = {
  title: { String, required: true },
  content: { String, required: true },
};

const Note = mongoose.model("Note", noteSchema);
app.listen(8000, () => console.log("server running on port 8000"));
