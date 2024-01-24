// src/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Before query");
    const user = await User.findOne({ username });
    console.log("After query");

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log("Before password comparison");
    const isPasswordValid = await user.comparePassword(password);
    console.log("After password comparison");

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    console.log("code login", process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "ritikbhushan"
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login };
