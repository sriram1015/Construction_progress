const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Regular user DB connection
const { connectAdminDB } = require('./config/admindb'); // Admin DB connection
const authRoutes = require('./routes/auth');
const addrole = require('./routes/addrole');

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to both databases
connectDB(); // For regular users
connectAdminDB(); // For admin users


// Use authentication routes
app.use('/auth', authRoutes);
app.use('/add', addrole);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}.....✅`);
});
