const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.MONGO_CONN;
console.log("Connecting to:", mongo_url);

mongoose.connect(mongo_url)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
})
  