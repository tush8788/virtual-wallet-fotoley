module.exports.dashboard=function(req,res){
    return res.render('./user/dashboard',{
        title:"Dashboard | User"
    })
}