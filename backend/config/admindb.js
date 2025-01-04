const mongoose = require('mongoose');
const { Mongoose } = require('mongoose');

// Create a new Mongoose instance for the admin DB connection
const adminDB = new Mongoose();

const connectAdminDB = async () => {
  try {
    await adminDB.connect('mongodb://localhost:27017/admin', {
      // Removed deprecated options
    });
    console.log('Admin MongoDB connected......📶');
  } catch (err) {
    console.error('Error connecting to admin MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectAdminDB, adminDB };
