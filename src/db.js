const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(`mongodb://localhost/${config.db}`, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", error => {
  console.log("Connection error: ", error);
});

db.once("open", () => {
  console.log("Connected to database: ", config.db);
});

module.exports = mongoose;
