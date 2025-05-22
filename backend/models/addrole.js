const mongoose = require('mongoose');

const stageContentSchema = new mongoose.Schema({
    Foundation: { type: String, default: "" },
    "Plinth and building": { type: String, default: "" },
    Lintel: { type: String, default: "" },
    Roofing: { type: String, default: "" },
    Plastering: { type: String, default: "" },
    Flooring: { type: String, default: "" },
    Painting: { type: String, default: "" }
}, { _id: false });

const roleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    stageContent: { type: stageContentSchema, required: true },
    assignedUser: { type: String, required: true }
});

// Fix: Prevent OverwriteModelError
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

module.exports = Role;