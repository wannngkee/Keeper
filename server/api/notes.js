const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

//@route  Get /notes
//@desc   Get user data
//@access Private
router.get("/", (req, res) => {
  User.find({ email: req.query.user })
    .select("notes")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send(err));
});

//@route  Post /notes
//@desc   Create a new note
//@access Private
router.post("/", (req, res) => {
  User.findOneAndUpdate({ email: req.body.user })
    .then((foundUser) => {
      const newNote = {
        title: req.body.title,
        content: req.body.content,
      };
      foundUser.notes.push(newNote);
      foundUser.save().then(() => {
        res.status(200).json({ msg: "new note added successfully" });
      });
    })
    .catch((err) => res.status(400).send(err));
});

//@route  patch /notes/:id
//@desc   Update note
//@access Private
router.patch("/:user/:id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.params.user },
    {
      $set: {
        "notes.$[el].title": req.body.title,
        "notes.$[el].content": req.body.content,
      },
    },
    {
      arrayFilters: [{ "el._id": req.params.id }],
      new: true,
    },
    function (err) {
      if (!err) {
        console.log("Update successfully");
      } else {
        console.log(err);
      }
    }
  );
});

//@route  Delete /notes/:id
//@desc   Delete a note
//@access Private
router.delete("/:id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.query.user },
    { $pull: { notes: { _id: req.params.id } } },
    { new: true },
    function (err) {
      if (!err) {
        console.log("Successfully deleted the corresponding note");
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
