const { adminDB } = require('../config/admindb');


const mongoose = require('mongoose'); // Import mongoose

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema); // Define the model

module.exports = Admin; // Export the model
