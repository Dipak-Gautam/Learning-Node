const mongoose = require("mongoose");

//defining ythe person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["waiter", "chef", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  userName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

//Creating Person Model
const Person = mongoose.model("person", personSchema);
module.exports = Person;
