const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

// Create a new Mongoose instance for admin DB
const adminDB = new mongoose.Mongoose();

const connectAdminDB = async () => {
  try {
    const adminDBUri = `${process.env.mongo_url}admins`;
    await adminDB.connect(adminDBUri);

    console.log('Admin MongoDB connected......📶');
  } catch (err) {
    console.error('Error connecting to admin MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectAdminDB, adminDB };
