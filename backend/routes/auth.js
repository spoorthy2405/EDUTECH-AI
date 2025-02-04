const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password })
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log({username})
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "123", { expiresIn: "1h" });

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

module.exports = router;