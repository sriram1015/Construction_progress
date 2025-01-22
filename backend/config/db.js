const mongoose = require('mongoose');
require('dotenv').config();  

const connectDB = async () => {
  try {
    // Log the value of MONGO_BASE_URL to ensure it's being loaded properly
    console.log('MONGO_BASE_URL:', process.env.MONGO_URI);  // Debugging line
    
    const mongoURI = "mongodb+srv://sriramv:W6FfKrdsrIdfq1Pr@contruction.puvc6.mongodb.net/construction";  
    console.log('Connecting to MongoDB with URI:', mongoURI);  // Debugging line

    await mongoose.connect(mongoURI);

    console.log('User MongoDB connected.......📶');
  } catch (err) {
    console.error('Error connecting to user MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
