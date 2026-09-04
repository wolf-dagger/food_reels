const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const savedModel = require("../models/save.model");
const likeModel = require("../models/likes.model");

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

async function likeFood(req, res) {
  const { foodId } = req.body;

  const user = req.user;

  const isLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likes: -1 },
    });

    return res.status(200).json({
      message: "Food unliked successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likes: 1 },
  });

  res.status(201).json({
    message: "Food liked successfully",
    like,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isSaved = await savedModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isSaved) {
    await savedModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    return res.status(200).json({
      message: "Food unsaved successfully",
    });
  }

  const save = await savedModel.create({
    user: user._id,
    food: foodId,
  });

  res.status(201).json({
    message: "Food saved successfully",
    save,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
};
