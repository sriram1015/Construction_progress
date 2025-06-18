const express = require('express');
const { registerUser, fetchAllUsers, updateUser, deleteUser, AddRole } = require('../controller/admin.controller');
const Adminrouter = express.Router();

Adminrouter.post('/register', registerUser );
Adminrouter.get('/allusers', fetchAllUsers);
Adminrouter.put('/update/:id', updateUser);
Adminrouter.delete('/delete/:id', deleteUser);
Adminrouter.post('/addrole', AddRole)
module.exports = Adminrouter;
