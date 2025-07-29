//EXTERNAL MODULES
const express = require("express");
const MenuItem = require("./models/menuItem");
const Person = require("./models/person");

const bodyParser = require("body-parser");

const app = express();

const db = require("./db");
const menuItem = require("./models/menuItem");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcoome</h1>
    <h2>how can I help you?</h2>
    `);
});
app.post("/person", async (req, res) => {
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
app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (e) {
    console.log("Error getting persons: " + e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/menu", async (req, res) => {
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

app.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();

    res.status(200).json(data);
  } catch (e) {
    console.log("error in menu item" + e);

    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/person/:worktype", async (req, res) => {
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

app.use((req, res) => {
  notfound = {
    status: 404,
    data: {
      error: "page not found",
    },
  };
  res.status(404).send(notfound);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`SERVER STARED AT http:localhost:${PORT}`);
});
