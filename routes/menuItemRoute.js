const express = require("express");
const menuItemRouter = express.Router();
const MenuItem = require("../models/menuItem");

menuItemRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    res.status(200).json(response);
  } catch (e) {
    console.log("error in posting menu item" + e);
    res.status(500).json({ error: "internal server error" });
  }
});

menuItemRouter.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();

    res.status(200).json(data);
  } catch (e) {
    console.log("error in menu item" + e);

    res.status(500).json({ error: "internal server error" });
  }
});

menuItemRouter.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;

    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });

      res.status(200).json(response);
      console.log("taste data fetch");
    } else {
      res.send(404).json({ error: "taste now found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = menuItemRouter;
