const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// User registration
router.post('/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to register the user.' });
  }
});

// User login
router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log in.' });
  }
});

// Get user profile
router.get('/users/profile', async (req, res) => {
  try {
    // Extract the userId from the JWT token
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

module.exports = router;
