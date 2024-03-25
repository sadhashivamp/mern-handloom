// Import necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const userController = async (req, res) => {
  const { username, phoneNumber, password, confirmPassword, role } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  // Create a new user instance
  const newUser = new User({
    username,
    phoneNumber,
    password,
    confirmPassword,
    role
  });

  try {
    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user", error: error.message });
  }
};

module.exports = userController;
