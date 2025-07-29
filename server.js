//EXTERNAL MODULES
const express = require("express");
const MenuItem = require("./models/menuItem");

const bodyParser = require("body-parser");

const app = express();

const db = require("./db");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcoome</h1>
    <h2>how can I help you?</h2>
    `);
});
// app.get("/chicken", (req, res) => {
//   var customzied_chicken = {
//     name: "Broast",
//     size: "1 Piece",
//   };
//   res.send(customzied_chicken);
// });

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
