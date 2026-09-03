const userModel = require("../models/user.model");
const foodpartnerModel = require("../models/foodpartner.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//USER CONSTROLLERS

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    missage: "User logged out successfully",
  });
}

//FOOD PARTNER CONTROLLERS

async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address, contactName } = req.body;

  const isFoodPartnerAlreadyExist = await foodpartnerModel.findOne({ email });

  if (isFoodPartnerAlreadyExist) {
    return res.status(400).json({
      message: "Food partner already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodpartner = await foodpartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName,
  });

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner registered successfully",
    foodpartner: {
      _id: foodpartner._id,
      email: foodpartner.email,
      name: foodpartner.name,
      phone: foodpartner.phone,
      address: foodpartner.address,
      contactName: foodpartner.contactName,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const isFoodPartnerExists = await foodpartnerModel.findOne({ email });

  if (!isFoodPartnerExists) {
    return res.status(400).json({
      message: "Food partner does not exist",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    isFoodPartnerExists.password,
  );

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: isFoodPartnerExists._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Food partner logged in successfully",
    foodpartner: {
      _id: isFoodPartnerExists._id,
      email,
      name: isFoodPartnerExists.name,
    },
  });
}

async function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    missage: "Food partner logged out successfully",
  });
}

module.exports = {
  //user exports
  registerUser,
  loginUser,
  logoutUser,

  //foodpartner exports
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
