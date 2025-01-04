const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/sriramv', {
      // Removed deprecated options
    });
    console.log('User MongoDB connected.......📶');
  } catch (err) {
    console.error('Error connecting to user MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
