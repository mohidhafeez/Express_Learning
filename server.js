//EXTERNAL MODULES
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcoome</h1>
    <h2>how can I help you?</h2>
    `);
});
app.get("/chicken", (req, res) => {
  var customzied_chicken = {
    name: "Broast",
    size: "1 Piece",
  };
  res.send(customzied_chicken);
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
