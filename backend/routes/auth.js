// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password, walletAddress } = req.body;

  // Basic validation
  if (!username || !email || !password || !walletAddress) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists with this email' });
    }

    // Check if walletAddress already exists
    user = await User.findOne({ walletAddress });
    if (user) {
      return res.status(400).json({ msg: 'Wallet address is already in use' });
    }

    // Create new user
    user = new User({ username, email, password, walletAddress });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create JWT payload
    const payload = { userId: user.id };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user details
    res.json({ token, walletAddress: user.walletAddress, username: user.username });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).send('Server error');
  }
});

// Login route (unchanged)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = { userId: user.id };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user details
    res.json({ token, walletAddress: user.walletAddress, username: user.username });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Server error');
  }
});

// Logout route (optional, since JWT is stateless)
router.get('/logout', (req, res) => {
  // Implement logout logic if using sessions or token blacklisting
  res.status(200).json({ msg: 'Logged out successfully' });
});

module.exports = router;
