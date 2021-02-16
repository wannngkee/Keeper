require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// app.use(
//   session({
//     secret: "Our little secret.",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
mongoose.set("useCreateIndex", true);

mongoose.connect(
  process.env.DBCONNECT,
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

// passport.use(User.createStrategy());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

app.post("/register", function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({msg: "Please enter all fields"})
  }
  User.findOne({ email })
    .then(user => {
    if (user) return res.status(400).send( "User already exists" );
    // User.register({ username: email }, password, function (err, user) {
    //   if (err) {
    //     return res.status(400).send(err);
    //   } else {
    //     passport.authenticate("local")(req, res, function () {
    //     return res.status(200).json({ msg: "User registered successfully" });
    //     });
    //   }
    // });   
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
            res.status(200).json({msg:"User created successfully"})
            })
            .catch((err) => {
              res.status(400).json({msg:err})
            })        
      })
    })  
  }) 
})


//////////////////////////////////////Requesting Targetting All Notes///////////////////////////

app.route("/notes")
  //if (req.isAuthenticated()){
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
//   }

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
