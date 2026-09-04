// create server

const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodpartnerRoutes = require("./routes/foodpartner.routes");
const cors = require("cors");

const app = express();

// Midleware : helps to parse json from req.body.
app.use(express.json());

//CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Midleware : helps to parse cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// authentication routes
app.use("/api/auth", authRoutes);

// food routes
app.use("/api/food", foodRoutes);

// food partner routes
app.use("/api/foodpartner", foodpartnerRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "File too large" });
  }
  res.status(500).json({ message: err.message || "Internal server error" });
});

module.exports = app;
