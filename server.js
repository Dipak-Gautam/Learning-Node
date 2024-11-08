const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);
app.get("/", function (req, res) {
  res.send("Hello World this is mr first api to say");
});

const personRoutes = require("./routes/PersonRoutes");
const MenuItemRoutes = require("./routes/MenuItemRoutes");

app.use("/person", personRoutes);
app.use("/menuitems", MenuItemRoutes);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
