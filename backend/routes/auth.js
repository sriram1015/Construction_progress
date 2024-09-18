const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router(); 
const User = require('../models/user');

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password, memberType, secretKey } = req.body;
  console.log(`Attempting registration for email: ${email}, memberType: ${memberType}`);
  
  try {
    // Check secret key for district users
    if (memberType === 'districtuser' && secretKey !== 'AdarshT') {
      console.log('Invalid secret key provided.');
      return res.status(400).json({ status: 'error', message: 'Invalid Secret Key' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email, memberType });
    if (existingUser) {
      console.log('User already exists.');
      return res.status(400).json({ status: 'error', message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      memberType
    });

    await newUser.save();
    console.log('User registered successfully.');
    res.json({ status: 'ok', message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred during registration. Please try again later.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password, memberType } = req.body;
  console.log(`Attempting login for email: ${email}, memberType: ${memberType}`);

  try {
    const user = await User.findOne({ email, memberType });
    if (!user) {
      console.log('User not found.');
      return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password.');
      return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }

    console.log('User logged in successfully.');
    res.json({ status: 'ok', message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred during login. Please try again later.' });
  }
});

module.exports = router;
