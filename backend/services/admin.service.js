const adminModel = require('../models/user');
const bcrypt = require('bcrypt');
const userRole = require('../models/addrole');

class AdminService {
    async register(username, email, password, memberType) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new adminModel({
        username,
        email,
        password: hashedPassword,
        memberType
    });
    const savedUser = await newUser.save();
    return savedUser;
    }
    async fetchallUsers(){
        const users = await adminModel.find({}, 'username email memberType'); // Fetch all users, return specific fields
        return users;
    }
    async updateUser(id, username , email , membertype) {
        const updateUser = await adminModel.findByIdAndUpdate(
            id,{
                username: username,
                email: email,
                memberType: membertype
            },
            { new: true } // Return the updated document
        );
        return updateUser;
    }
    async deleteUser(userId) {
    const deletedUser = await adminModel.findByIdAndDelete(userId);
    return deletedUser;
    }
   async addrole(title ,stageContent,assignedUser){
    const existingRole = await userRole.findOne({ title, assignedUser });
    if (existingRole) {
        throw new Error('Role with this title and assigned user already exists.');
    }
       const newRole = new userRole({
           title,
           stageContent,
           assignedUser
       });
       const savedRole = await newRole.save();
       return savedRole;
   }
}

module.exports = new AdminService();