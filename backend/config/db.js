const mongoose = require('mongoose');
require('dotenv').config();  

const connectDB = async () => {
    mongoose.connect(`${process.env.mongo_url}construction`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
      console.log('MongoDB connected successfully');
    })
    .catch((err)=>{
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
};

module.exports = connectDB;
