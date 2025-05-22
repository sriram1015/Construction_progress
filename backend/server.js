const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); 
require('dotenv').config();  


const authRoutes = require('./routes/auth');
const addrole = require('./routes/addrole');
const profile = require('./routes/Profile');
const Userrouter = require('./routes/UserRoutes');
const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to both databases
connectDB(); 


// Use authentication routes
app.use('/auth', authRoutes);
app.use('/add', addrole);
app.use('/profile', profile);
app.use('/user', Userrouter);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}.....✅`);
});
