const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router(); 
const User = require('../models/user');
const Admin = require('../models/admin');

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password, memberType, secretKey } = req.body;
  console.log(`✅Attempting registration for email: ${email}, memberType: ${memberType}`);
  
  try {
    // Check secret key for district users
    if (memberType === 'districtuser' && secretKey !== 'AdarshT') {
      console.log('❗❗Invalid secret key provided.');
      return res.status(400).json({ status: 'error', message: 'Invalid Secret Key' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email, memberType });
    if (existingUser) {
      console.log('User already exists.❗❗');
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
    console.log('User registered successfully.✅');
    res.json({ status: 'ok', message: 'Registration successful' });
  } catch (error) {
    console.error('❗❗Error during registration:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred during registration. Please try again later.' });
  }
});



// Admin Registration route
router.post('/adminregister', async (req, res) => {
  const { username, email, password, secretKey } = req.body;
  console.log(`Attempting admin registration for email: ${email} ✅`);

  try {
    // Check if secret key matches for admin registration
    if (secretKey !== 'sriram2615') { // Replace with your actual secret key for admins
      console.log('❗❗Invalid secret key provided for admin registration.');
      return res.status(400).json({ status: 'error', message: 'Invalid Secret Key' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists.✅');
      return res.status(400).json({ status: 'error', message: 'Admin already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log('Admin registered successfully.✅');
    res.json({ status: 'ok', message: 'Admin registration successful' });
  } catch (error) {
    console.error('❗❗Error during admin registration:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred during admin registration. Please try again later.' });
  }
});


// Login route
router.post('/adminlogin', async(req,res)=>{
  const {email,password}=req.body;
  console.log(`Attempting login for email: ${email}, memberType: Admin ✅`);

  try{
    const user = await Admin.findOne({email});
    if(!user){
      console.log('❗❗User not found.');
      return res.status(400).json({status: 'error', message: 'Invalid credentials'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('❗❗Invalid password.');
      return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }
    console.log('User logged in successfully.✅');
    res.json({ status: 'ok', message: 'Login successful' });
  } catch (error) {
    console.error('❗❗Error during login:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred during login. Please try again later.' });
  }

});
router.post('/login', async (req, res) => {
  const { username, password, memberType } = req.body;
  console.log(`Attempting login for UserName: ${username}, memberType: ${memberType} ✅`);

  try {
    const user = await User.findOne({ username, memberType });
    if (!user) {
      console.log('User not found.❌');
      return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password.❌');
      return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }

    console.log('User logged in successfully.✅');
    res.json({ status: 'ok', message: 'Login successful' });
  } catch (error) {
    console.error('❗❗Error during login:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred during login. Please try again later.' });
  }
});

// API to fetch all users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, 'username email memberType'); // Fetch all users, return specific fields
    res.status(200).json({ status: 'ok', users });
  } catch (error) {
    console.error('❗❗Error fetching users:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch users' });
  }
});

router.delete('/delete-user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    console.log(`Deleted sucessfully.✅`);
    res.json({ status: 'ok', message: 'User deleted successfully' });
  } catch (error) {
    console.error('❗❗Error deleting user:', error);
    res.status(500).json({ status: 'error', message: 'Server error occurred' });
  }
});

// Update user details by ID
router.put('/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, memberType } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { username, email, memberType },
      { new: true } // Return the updated document
    );
    
    if (!updatedUser) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    console.log(`Updated sucessfully.✅`);
    res.json({ status: 'ok', updatedUser });
  } catch (error) {
    console.error('❗❗Error updating user:', error);
    res.status(500).json({ status: 'error', message: 'Failed to update user' });
  }
});






module.exports = router;
