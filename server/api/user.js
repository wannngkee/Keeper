const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");
require("dotenv").config();

//@route  POST /auth/register
//@desc   Register new user
//@access Public
router.post("/register", function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).send("User already exists");
    const newUser = new User({
      email,
      password,
    });
    //create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user.id },
              process.env.JWTSECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.status(200).json({ msg: "User created successfully", token });
              }
            );
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      });
    });
  });
});

//@route  Post /auth/
//@desc   Authenticate user
//@access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).send("User does not exist")
      //validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).send("Invalid password")
          jwt.sign(
            { id: user.id },
            process.env.JWTSECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({ msg: "User login successfully", token });
            }
          );
      })
    })
})

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;