const TransactionDB = require('../models/transactions');
const UserDB = require('../models/user'); 

module.exports.dashboard=function(req,res){
    return res.render('./user/dashboard',{
        title:"Dashboard | User"
    })
}

//view transaction
module.exports.viewTransactions=async function(req,res){
    try{
        let user = await UserDB.findById(req.user.id)
        .populate({
            path:'transactions',
            populate:{path:'sender receiver'},
            },
        ).exec();

        return res.render('./user/transations',{
            title:"View Transation",
            userdata:user
        })
    }
    catch(err){
        console.log(err);
    }
}