require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  //check for token
  if (!token) {
    res.status(401).send("No token, authorization denied")
  }
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    //add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send(e);
    //res.status(400).send("Token is not valid")
  }
}

module.exports = auth;