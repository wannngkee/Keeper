require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

mongoose.set("useCreateIndex", true);

mongoose.connect(
  process.env.MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB connection established successfully")
})

const Note = require("./models/note.model")

const User = require("./models/user.model")

app.post("/register", function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({msg: "Please enter all fields"})
  }
  User.findOne({ email })
    .then(user => {
    if (user) return res.status(400).send( "User already exists" );  
    const newUser = new User({
      email, password
    })
    //create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then((user) => {
              jwt.sign(
                { id: user.id },
                process.env.JWTSECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.status(200).json({ msg: "User created successfully", token });
                })})
            .catch((err) => {
              res.status(400).send(err);});         
      })
    })  
  }) 
})


//////////////////////////////////////Requesting Targetting All Notes///////////////////////////

app.route("/notes")
  .get(function (req, res) {
    Note.find({ email: req.body.email }, function (err, founduser) {
      if (!err) {
        res.json(founduser.notes);
      } else {
        console.log(err);
      }
    });
  })

  .post(function (req, res) {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    newNote
      .save()
      .then((todo) => {
        res.status(200).json({ note: "note added successfully" });
      })
      .catch((err) => {
        res.status(400).send("adding new note failed");
      });
  });

//////////////////////////////////////Requesting Targetting A Specific Note///////////////////////////
app.route("/notes/:id")
  .patch(function (req, res) {
    Note.update({ _id: req.params.id }, { $set: req.body }, function (err) {
      if (!err) {
        console.log("Successfully updated note.");
      } else {
        console.log(err);
      }
    });
  })

  .delete(function (req, res) {
    //console.log(req.params)
    Note.deleteOne({ _id: req.params.id }, function (err) {
      if (!err) {
        console.log("Successfully deleted the corresponding note");
      } else {
        console.log(err);
      }
    });
  });

app.listen(port, () => console.log("server running at " + port));
