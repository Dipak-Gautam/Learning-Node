const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

app.use(bodyParser.json());

//middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ userName: username });

      if (!user) {
        return done(null, false, { message: "Incorrect UserName" });
      }
      const isPasswordMatch = user.password === password ? true : false;

      if (isPasswordMatch == true) {
        return done(null, user);
      } else {
        return done(null, null, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

app.use(passport.initialize());

app.get(
  "/",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    res.send("Hello World this is mr first api to say");
  }
);

const personRoutes = require("./routes/PersonRoutes");
const MenuItemRoutes = require("./routes/MenuItemRoutes");

app.use("/person", personRoutes);
app.use("/menuitems", MenuItemRoutes);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
