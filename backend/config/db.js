const mongoose = require('mongoose');
require('dotenv').config();  

const connectDB = async () => {
  try {
    
    const mongoURI = `${process.env.mongo_url}construction`;  

    console.log('Connecting to MongoDB with URI:', mongoURI); 

    await mongoose.connect(mongoURI);

    console.log('User MongoDB connected.......📶');
  } catch (err) {
    console.error('Error connecting to user MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
