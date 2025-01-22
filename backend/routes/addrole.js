const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');

const Role = mongoose.model('Role', new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: false },
    stageContent: { type: Object, required: true },
    assignedUser: { type: String, required: true }, // Changed to store username
}));

// Middleware for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Endpoint to fetch all users from the database
router.get('/use1', async (req, res) => {
    try {
        const users = await User.find({}, 'username');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

// Endpoint to add a role
router.post('/role/addrole', upload.single('image'), async (req, res) => {
    const { title, stageContent, assignedUser } = req.body;
    const imagePath = req.file ? req.file.path : '';

    // Validation for required fields
    if (!title || !stageContent || !assignedUser) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Check if the assigned user exists in the database
        const user = await User.findOne({ username: assignedUser });
        if (!user) {
            return res.status(404).json({ error: 'Assigned user not found.' });
        }

        // Create and save the role
        const role = new Role({
            title,
            image: imagePath,
            stageContent: JSON.parse(stageContent),
            assignedUser, // Store username directly
        });
        await role.save();

        res.status(201).json({ message: 'Role added successfully.', role });
    } catch (err) {
        console.error('Error adding role:', err);
        res.status(500).json({ error: 'Failed to add role.' });
    }
});

module.exports = router;
