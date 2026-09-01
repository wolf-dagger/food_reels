// create server

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Midleware : helps to parse json from req.body.
app.use(express.json());

// Midleware : helps to parse cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
