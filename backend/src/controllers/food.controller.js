const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const fs = require("fs");

async function createFood(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const fileUploadResult = await storageService.uploadFile(
      fs.createReadStream(req.file.path),
      req.file.originalname || uuid(),
    );

    fs.unlink(req.file.path, () => {});

    console.log("fileUploadResult:", fileUploadResult);

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    return res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (err) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }

    console.error("Upload failed:", err);
    return res.status(500).json({
      message: "Image upload failed",
      error: err.message,
    });
  }
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({}).populate("foodPartner");
  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

module.exports = {
  createFood,
  getFoodItems,
};
