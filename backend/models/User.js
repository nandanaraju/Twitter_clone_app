// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true, // Ensure walletAddress is unique
    trim: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for unique fields
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ walletAddress: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
