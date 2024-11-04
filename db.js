const mongoose = require("mongoose");

//Define the mongoDb connection URL
const mongoURL = "mongodb://localhost:27017/TestHotels";

//set up mongoDb connection

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//mongoose maintains a defult connection object representing the MongoDB Connection
const db = mongoose.connection;

// Define event listener for database  connection
db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB Connection Error", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

//Export the DataBase Connection
module.exports = db;
