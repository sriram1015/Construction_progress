const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// Endpoint to update user profile
router.put('/update', async (req, res) => {
    const { username, email, phone, role } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
    }

    try {
        // Find the user by username and update their details
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { email, phone, memberType: role },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile.' });
    }
});

module.exports = router;