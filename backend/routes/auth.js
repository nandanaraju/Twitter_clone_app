const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password, walletAddress } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password, walletAddress });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, walletAddress: user.walletAddress });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/logout', (req, res) => {
  res.status(200).json({ msg: 'Logged out successfully' });
});

module.exports = router;
