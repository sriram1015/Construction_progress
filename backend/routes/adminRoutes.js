const express = require('express');
const { registerUser, fetchAllUsers, updateUser, deleteUser } = require('../controller/admin.controller');
const Adminrouter = express.Router();

Adminrouter.post('/register', registerUser );
Adminrouter.get('/allusers', fetchAllUsers);
Adminrouter.put('/update/:id', updateUser);
Adminrouter.delete('/delete/:id', deleteUser);

module.exports = Adminrouter;
