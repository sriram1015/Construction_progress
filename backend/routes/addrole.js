const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');

const Role = mongoose.model('Role', new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: false },
    stageContent: { type: Object, required: true },
    assignedUser: { type: String, required: true },
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

// Endpoint to fetch roles assigned to the logged-in user
router.get('/roles/user', async (req, res) => {
    const { username } = req.query; // Extract username from query parameters

    if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
    }

    try {
        const roles = await Role.find({ assignedUser: username }); // Fetch roles assigned to the user
        if (!roles || roles.length === 0) {
            return res.status(404).json({ error: 'No roles found for the user.' });
        }

        // Format the roles to include stageContent as an array
        const formattedRoles = roles.map((role) => ({
            id: role._id,
            title: role.title,
            stageContent: Object.entries(role.stageContent).map(([key, value]) => ({
                stage: key,
                content: value,
            })),
        }));

        res.json(formattedRoles);
    } catch (err) {
        console.error('Error fetching user roles:', err);
        res.status(500).json({ error: 'Failed to fetch user roles.' });
    }
});

router.put('/role/updatestage', async (req, res) => {
    const { roleId, stage, value } = req.body;

    if (!roleId || !stage) {
        return res.status(400).json({ error: 'roleId and stage are required.' });
    }

    try {
        // Use dot notation to update the specific stage in stageContent
        const update = {};
        update[`stageContent.${stage}`] = value;

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            { $set: update },
            { new: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ error: 'Role not found.' });
        }

        res.json({ message: 'Stage updated successfully.', role: updatedRole });
    } catch (err) {
        console.error('Error updating stage:', err);
        res.status(500).json({ error: 'Failed to update stage.' });
    }
});




module.exports = router;