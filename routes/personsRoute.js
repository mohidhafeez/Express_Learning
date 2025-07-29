const express = require("express");
const personRouter = express.Router();
const Person = require("../models/person");

personRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    res.status(200).json(response);
  } catch (e) {
    console.log("Error posting person: " + e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET - Get all persons
personRouter.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (e) {
    console.log("Error getting persons: " + e);
    res.status(500).json({ error: "Internal server error" });
  }
});

personRouter.get("/:worktype", async (req, res) => {
  try {
    //PARAMETER
    const workType = req.params.worktype;

    //VALIDATION
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetch");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid choice" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = personRouter;
