require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
const User = require("./models/user.model");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

//routes
const noteRoutes = require("./api/notes");

//use routes
app.use("/notes", noteRoutes);

mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB connection established successfully");
});

app.listen(port, () => console.log("server running at " + port));
