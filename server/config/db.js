const mongoose = require('mongoose');
require('dotenv').config();

async function DBconnect() {
  try {
    const DB_URI = process.env.DB_URI;
    
    // Connecting to MongoDB
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

DBconnect();

module.exports = mongoose;
