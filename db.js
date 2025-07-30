// TO MAKE CONNECTION BETWEEN MONGO_DB AND THE NODE.JS

const mongoose = require("mongoose");

//DEFINE THE MONGO DB CONNECTION URL

// const mongoURL = "mongodb://localhost:27017/hotels"; // REPLEACE WITH YOUR DATABASE NAME

const mongoURL =
  "mongodb+srv://mohidhafeez:Hm64m6gjrk@cluster0.gnyemdt.mongodb.net/"; // REPLEACE WITH YOUR DATABASE NAME
// REPLEACE WITH YOUR DATABASE NAME

//SET UP CONNECTION
mongoose.connect(mongoURL, {
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
