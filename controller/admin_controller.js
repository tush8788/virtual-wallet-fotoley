const UserDB = require('../models/user');

module.exports.dashboard=async function(req,res){
    try{
        let users = await UserDB.find({ email: { $ne: req.user.email }, isAdmin: { $ne: true } });
        // console.log(users);
        return res.render('./admin/dashboard',{
            title:"dashboard",
            users
        })
    }
    catch(err){
        console.log(err);
        return;
    }
}