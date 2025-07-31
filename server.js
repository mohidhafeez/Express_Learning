//EXTERNAL MODULES
const express = require("express");
const MenuItem = require("./models/menuItem");
const db = require("./db");

const personRouter = require("./routes/personsRoute");
const menuItemRouter = require("./routes/menuItemRoute");

const bodyParser = require("body-parser");
const passport = require("./auth");

const app = express();

require("dotenv").config();

const logging = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to :${req.originalUrl}`
  );
  next();
};

app.use(bodyParser.json());
app.use(logging);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", localAuthMiddleware, (req, res) => {
  res.send(`
    <h1>Welcoome</h1>
    <h2>how can I help you?</h2>
    `);
});

app.use("/person", localAuthMiddleware, personRouter);
app.use("/menu", localAuthMiddleware, menuItemRouter);

app.use((req, res) => {
  notfound = {
    status: 404,
    data: {
      error: "page not found",
    },
  };
  res.status(404).send(notfound);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER STARED AT http://localhost:${PORT}`);
});
