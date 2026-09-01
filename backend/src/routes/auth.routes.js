const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// user register route
router.post("/user/register", authController.registerUser);

// user login route
router.post("/user/login", authController.loginUser);

module.exports = router;
