const userModel = require('../models/user');
const userRole = require('../models/addrole');
const bcrypt = require('bcrypt');

class UserService{
    
    async login(username,password,memberType){
        const user = await userModel.findOne({username, memberType});
        if(!user){
            throw new Error('User Not Found');
            console.error('User Not Found');
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            throw new Error('Invalid Credentials');
            console.error('Invalid Credentials');
        }
        return user;
    }
    async isUserEmailExist(email){
        const user = await userModel.findOne({email});
        if(!user){
            throw new Error('User Not Found');
        }
        return user;    
    }
    async getUserProfile(username){
        const user = await userModel.findOne({username});
        if (!user) {
            throw new Error('User Not Found');
        }   
        return user;
    }
    async arrayofUsers(){
        const users = await userModel.find({}, 'username');
        if (!users || users.length === 0) {
            throw new Error('No Users Found');
        }
        return users;
    }
    async getUserjob(username){
        const user = await this.arrayofUsers(username);
        if (!user) {
            throw new Error('User Not Found');
        }
        const job = await userRole.find({assignedUser: username});
        if(!job || job.length === 0){
            throw new Error('Job not Found');

        }
        return job;
    }
}

module.exports = new UserService();