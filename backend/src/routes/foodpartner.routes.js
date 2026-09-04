const express = require("express");
const foodpartnerController = require("../controllers/foodpartner.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

// Get /api/food/foodpartner/:id
router.get(
  "/:id",
  authMiddleware.authUserMiddleware,
  foodpartnerController.getFoodPartnerById,
);

module.exports = router;
