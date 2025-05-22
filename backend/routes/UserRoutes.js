const express = require('express');
const { registerUser, loginUser, getuserProfile, getUserjobs } = require('../controller/user.controller');
const Userrouter = express.Router();

Userrouter.post('/register', registerUser);
Userrouter.post('/login', loginUser);
Userrouter.get('/profile', getuserProfile);
Userrouter.get('/job', getUserjobs);

module.exports = Userrouter;