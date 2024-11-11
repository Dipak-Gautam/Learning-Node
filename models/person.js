const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

personSchema.pre("save", async function (next) {
  const person = this;
  console.log("good until now");
  //hash password if only the password is new or changes other wise return
  if (!person.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    // hash poassword
    const hashedPassword = await bcrypt.hash(person.password, salt);
    //OverRide plain password with hashed one
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

//Creating Person Model
const Person = mongoose.model("person", personSchema);
module.exports = Person;
