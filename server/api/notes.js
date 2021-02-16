const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user.model");

//@route  Get /notes
//@desc   Get user data
//@access Private
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("notes")
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err))
  });

//@route  Post /notes
//@desc   Create a new note
//@access Private
router.post("/", auth, (req, res) => {
  User.findById(req.user.id)
    .then(foundUser => {
      const newNote = {
        title: req.body.title,
        content: req.body.content,
      };
      foundUser.notes.push(newNote)
      foundUser.save().then(() => {res.status(200).json({msg:"new note added successfully"})})
    })
    .catch(err => res.status(400).send(err))
});



//@route  patch /notes/:id
//@desc   Update note
//@access Private
router.patch("/:id", auth, (req, res) => {
    User.findOneAndUpdate({ "notes._id": req.params.id }, { $set: req.body }, {new: true}, function (err) {
      if (!err) {
        console.log("Successfully updated note.");
      } else {
        console.log(err);
      }
    });
  })

//@route  Delete /notes/:id
//@desc   Delete a note
//@access Private
router.delete("/:id", auth, (req, res) => {
    //console.log(req.params)
  User.findOneAndUpdate({ "notes._id": req.params.id }, {$pull: {notes: {_id: req.params.id}}}, {new: true}, function (err) {
      if (!err) {
        console.log("Successfully deleted the corresponding note");
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;