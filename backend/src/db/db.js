const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://localhost:27017/food-reels")
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((err) => {
      console.log("MongooseDB connection failed", err);
    });
}

module.exports = connectDB;
