const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
// const tweetRoutes = require('./routes/tweet');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
// app.use('/api', tweetRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});
