const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuthMiddleWare = (req, res, next) => {
  const token = req.header.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ mwssage: "UnAuthorizred" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

//function to generate jwt token

const generateJWtToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleWare, generateJWtToken };
