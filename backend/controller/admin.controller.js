const AdminService = require('../services/admin.service');
exports.registerUser = async (req,res)=>{
    const {username,email,password,memberType}=req.body;
    try{
        const user = await AdminService.register(username,email,password,memberType);
        console.log('User Registered Successfully');
        res.status(200).json({
            status: 'ok',
            user,
            message: 'User Registered Successfully'
        });
    } catch(err){
        console.error(err);
        res.status(400).json({status:'error',message: 'Bad Request'});
    }
}

exports.fetchAllUsers = async(req,res)=>{
    try {
        const users = await AdminService.fetchallUsers();
        res.status(200).json({status:'ok',users});        
    } catch(err){
        console.error(err);
        res.status(500).json({status:'error',message: 'Internal Server Error'});
    }
}

exports.updateUser = async(req,res)=>{
    const { id } = req.params;
    const { username, email, memberType } = req.body;
    try{
        const updateUser = await AdminService.updateUser(id, username, email, memberType);
        if (!updateUser) {
            return res.status(404).json({status:'error',message: 'User not found'});
        }
        res.status(200).json({status:'ok',message:'User Updated Successfully',user:updateUser});
    } catch(err){
        console.error(err);
        res.status(500).json({status:'error',message: 'Internal Server Error'});
    }
}

exports.deleteUser = async(req,res)=>{
    userid= req.params.id;
    try{
        const deleteUser = await AdminService.deleteUser(userid);
        if(!deleteUser){
            return res.status(404).json({status:'error',message: 'User not found'});
        }
        res.status(200).json({status:'ok',message:'User Deleted Successfully'});
    } catch(err){
        console.error(err);
        res.status(500).json({status:'error',message: 'Internal Server Error'});
    }
}

exports.AddRole = async(req,res)=>{
    const {title, stageContent,assignedUser} = req.body;
    try{
        const newRole = await AdminService.addrole(title, stageContent, assignedUser);
        res.status(201).json({status:'ok',message:'Role Added Successfully',role:newRole});
    }
    catch(err){
        console.error(err);
        res.status(500).json({status:'error',message: err.message});
    }
}