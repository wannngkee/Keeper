require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
//const Note = require("./models/note.model");
const User = require("./models/user.model");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

//routes
const authRoutes = require("./api/user");
const noteRoutes = require("./api/notes")

//use routes
app.use('/user', authRoutes);
app.use('/notes', noteRoutes)

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

app.listen(port, () => console.log("server running at " + port));
