require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.DBCONNECT,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB connection established successfully")
})

const noteSchema = {
  title: { type: String, required: true },
  content: { type: String, required:true}
};

const Note = mongoose.model("Note", noteSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required:true}
  notes: { type: Note, required:true},
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//////////////////////////////////////Requesting Targetting All Notes///////////////////////////

// app.get("/", function (req, res) {
//   res.redirect("/notes");
// });

// app.get("/favicon.ico", function (req, res) {
//   res.redirect("/notes");
// });

app.route("/notes")

  .get(function (req, res) {
    Note.find(function (err, foundNotes) {
      if (!err) {
        res.json(foundNotes);
      } else {
        console.log(err);
      }
    })
  })
  
  .post(function (req, res) {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content
    })
    newNote.save()
      .then(todo => {
             res.status(200).json({'note':'note added successfully'})
      })
      .catch(err => {
            res.status(400).send('adding new note failed')
      })
  })

  // .delete (function (req, res) {
  // Note.deleteMany(function (err) {
  //   if (!err) {
  //     console.log("Successfully deleted all notes");
  //   } else {
  //     console.log(err);
  //   }
  // })
  // });

//////////////////////////////////////Requesting Targetting A Specific Note///////////////////////////
app.route("/notes/:id")

  // .get(function (req, res) {
  //   Note.findOne({ _id: req.params.id }, function (err, foundNote) {
  //     if (foundNote) {
  //       res.json(foundNote);
  //     } else {
  //       console.log("No notes matching that id was found.")
  //     }
  //   })
  // })

  // .put(function (req, res) {
  //   Note.update(
  //     { _id: req.params.id },
  //     { title: req.body.title, content: req.body.content },
  //     { overwrite: true },
  //     function (err) {
  //       if (!err) {
  //         console.log("Successfully update note.")
  //       } else {
  //         console.log(err)
  //       }
  //     }
  //   )
  // })

  .patch(function(req, res){
  Note.update(
    { _id: req.params.id },
    { $set: req.body },
    function (err) {
      if (!err) {
        console.log("Successfully updated note.")
      } else {
        console.log(err)
      }
    }
    )
  })
  
  .delete(function (req, res) {
    console.log(req.params)
  Note.deleteOne(
    { _id: req.params.id },
    function (err) {
      if (!err) {
        console.log("Successfully deleted the corresponding note")
      } else {
        console.log(err)
      }
    }
  )
});


app.listen(port, () => console.log("server running at" + port));
