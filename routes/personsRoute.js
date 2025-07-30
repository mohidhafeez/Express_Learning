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

//GET USING THE TYPE

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

//UPDATE OPERATION
//konsa record update krna hy or update mn kya chez update krni h

personRouter.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // returns the new document
        runValidators: true, // run mongooes validations
      }
    );
    if (!response) {
      res.status(404).json({ error: "person not found" });
    }
    console.log("data update");
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
});

personRouter.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    console.log("delete successfully");
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = personRouter;
