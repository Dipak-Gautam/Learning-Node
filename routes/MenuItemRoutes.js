const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuItem = new MenuItem(data);
    const response = await menuItem.save();
    console.log("menu save sucess");
    res
      .status(200)
      .json({ message: "Menu Item saved sucessfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched sucess");
    res.status(200).json({ message: "Sucess", data: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste === "sweet" || taste === "sour" || taste === "spicy") {
      const response = await MenuItem.find({ taste: taste });
      res
        .status(200)
        .json({ message: "data fetched sucessfully", data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
