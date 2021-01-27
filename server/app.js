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

//////////////////////////////////////Requesting Targetting All Notes///////////////////////////

app.route("/notes")

  .get(function (req, res) {
    Note.find(function (err, foundNotes) {
      if (!err) {
        res.send(foundNotes);
      } else {
        res.send(err);
      }
    })
  })
  
  .post(function (req, res) {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content
    })
    newNote.save(function (err) {
      if (!err) {
        res.send("Successfully added a new note!");
      } else {
        res.send(err);
      }
    })
  })

  .delete (function (req, res) {
  Note.deleteMany(function (err) {
    if (!err) {
      res.send("Successfully deleted all notes");
    } else {
      res.send(err);
    }
  })
});

//////////////////////////////////////Requesting Targetting A Specific Note///////////////////////////
app.route("/notes/:noteTitle")

  .get(function (req, res) {
    Note.findOne({ title: req.params.noteTitle }, function (err, foundNote) {
      if (foundNote) {
        res.send(foundNote);
      } else {
        res.send("No notes matching that id was found.")
      }
    })
  })

  .put(function (req, res) {
    Note.update(
      { title: req.params.noteTitle },
      { title: req.body.title, connect: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully update note.")
        } else {
          res.send(err)
        }
      }
    )
  })

  .patcch(function(req, res){
  Note.update(
    { title: req.params.noteTitle },
    { $set: req.body },
    function (err) {
      if (!err) {
        res.send("Successfully updated note.")
      } else {
        res.send(err)
      }
    }
    )
  })
  
  .delete (function (req, res) {
  Note.deleteOne(
    { title: req.params.articleTitle },
    function (err) {
      if (!err) {
        res.send("Successfully deleted the corresponding note")
      } else {
        res.send(err)
      }
    }
  )
});


app.listen(8000, () => console.log("server running on port 8000"));
