const UserService = require('../services/user.service');


exports.loginUser = async(req,res)=>{
    const {username,password,memberType}=req.body;
    if(!username || !password || !memberType){
        return res.status(400).json({message:'Please fill all the fields'});
    }
    try {
        const user = await UserService.login(username,password,memberType);
        console.log('User Logged In Successfully');
        res.status(200).json({
            status: "ok",
            username: user.username,
            memberType: user.memberType,
            message:'User Logged In Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

exports.getuserProfile = async(req,res)=>{
    const { username } = req.body;
    if(!username){
        return res.status(400).json({message:'Please fill all the fields'});
    }
    try {
        const user = await UserService.getUserProfile(username);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.getUserjobs = async(req,res)=>{
    const { username } = req.query;
    if(!username){
        return res.status(400).json({message:'Please fill all the fields'});
    }
    try {
        const jobs = await UserService.getUserjob(username);
        res.status(200).json(jobs);
    } catch (error) {
        if (error.message === 'Job not Found') {
            return res.status(404).json({message: 'Job not found'});
        }
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

