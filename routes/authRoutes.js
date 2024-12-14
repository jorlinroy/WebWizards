const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User schema

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error in register route:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    // Generate token if credentials are valid
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error in login route:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
