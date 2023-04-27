
//signin page
module.exports.siginPage=function(req,res){
    return res.render('signin',{
        title:"Sign-in",
        url:req.body.url,
        isAdmin:req.body.isAdmin
    })
}
//signup page
module.exports.sigupPage=function(req,res){
    return res.render('signup',{
        title:"Sign-up",
        url:req.body.url,
        isAdmin:req.body.isAdmin
    })
}