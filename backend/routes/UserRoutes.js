const express = require('express');
const { loginUser, getuserProfile, getUserjobs } = require('../controller/user.controller');
const Userrouter = express.Router();
const Job = require('../models/addrole');
const { AddRole } = require('../controller/admin.controller');
Userrouter.post('/login', loginUser);
Userrouter.get('/profile', getuserProfile);
Userrouter.get('/job', getUserjobs);

Userrouter.get('/job/stages', async (req, res) => {
  const { username, title } = req.query;
  try {
    const job = await Job.findOne({ assignedUser: username, title });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    // Convert stageContent object to array of { stage, value }
    const stageContentArray = Object.entries(job.stageContent).map(([stage, value]) => ({
      stage,
      value
    }));
    res.json({ stageContent: stageContentArray });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = Userrouter;