// TO MAKE CONNECTION BETWEEN MONGO_DB AND THE NODE.JS

const mongoose = require("mongoose");
require("dotenv").config();

//DEFINE THE MONGO DB CONNECTION URL

const mongoURLLocal = process.env.DB_URL_LOCAL; // your local database address
// const mongoURL = process.env.DB_URL; // REPLEACE WITH YOUR DATABASE NAME
// REPLEACE WITH YOUR DATABASE NAME

//SET UP CONNECTION
mongoose.connect(mongoURLLocal, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// FOR INTERACTION

const db = mongoose.connection;

//EVENT LISTNER FOR CONNECTION

db.on("connected", () => {
  console.log(`
    ---------------------------
    Connected to MONGODB server 
    ---------------------------
    `);
});
db.on("error", (err) => {
  console.log(`
    --------------------------------
    MONGODB connection error :${err}
    --------------------------------
    
    `);
});
db.on("disconnected", () => {
  console.log(`
    --------------------
    MONGODB disconnected
    --------------------
    `);
});

//EXPORT TO DATABASE CONNECTION

module.exports = db;
