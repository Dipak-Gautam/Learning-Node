const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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

// below is the obsilited code
// const data = req.body; // Ashuming request boday contains the person data

// //Create a new person document using the mongoose model
// const newPerson = new Person(data);

// //below is the old method you should directly send data to params like above
// // newPerson.name = data.name;
// // newPerson.work = data.work;
// // newPerson.mobile = data.mobile;
// // newPerson.email = data.email;
// // newPerson.salary = data.salary;
// // newPerson.age = data.age;
// // newPerson.address = data.address;

// // Save the new person to the database
// newPerson.save((error, savedPerson) => {
//   if (error) {
//     console.log("Error Saving Person");
//     res.status(500).json({ error: "Internal server error" });
//   } else {
//     console.log("Data Saved Successfully");
//     res
//       .status(200)
//       .json({ sucess: "Data saved successfully", data: savedPerson });
//   }
// });
