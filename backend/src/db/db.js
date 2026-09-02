const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((err) => {
      console.log("MongooseDB connection failed", err);
    });
}

module.exports = connectDB;
