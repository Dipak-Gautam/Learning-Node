const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const { findByIdAndUpdate } = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Ashuming request boday contains the person data
    //Create a new person document using the mongoose model
    const newPerson = new Person(data);
    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Data saved successfully");
    res.status(200).json({ success: "Data saved sucessfully", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched successfully");
    res.status(200).json({ success: "Data fetched sucessfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType === "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      res
        .status(200)
        .json({ message: "Data Sucessfully fetched", data: response });
    } else {
      res.status(404).json({ error: "Invalid worktype" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Person.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;