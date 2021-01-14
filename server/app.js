const express = require("express");
const bodayParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodayParser.urlencoded({ extended: true }));
app.use(cors);
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/keeperDB", {
  useNewUrlParser: true, useUnifiedTopology: true 
});
const noteSchema = {
  title: String,
  content: String
};

const Note = mongoose.model("Note", noteSchema);

app.get("/notes", function (req, res) {
  Note.find(function (err, foundNotes) {
    if (!err) {
      res.send(foundNotes);
    } else {
      res.send(err);
    }
  });
});

app.post("/notes", function(req,res){
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  })
  newNote.save(function(err){
    if (!err){
      res.send("Successfully added a new note!");
    } else(
      res.send(err);
    )
  });
})

app.listen(8000, () => console.log("server running on port 8000"));
