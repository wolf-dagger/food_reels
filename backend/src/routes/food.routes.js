const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");

// using multer to upload files so express can read/understand
const upload = multer({
  storage: multer.diskStorage({
    destination: "/tmp/uploads",
    filename: (req, file, cb) =>
      cb(null, uuid() + path.extname(file.originalname)),
  }),
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
});

// POST /api/food/ {PROTECTED}
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

// GET /api/food/ {PROTECTED}
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

// Post
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
);

module.exports = router;
