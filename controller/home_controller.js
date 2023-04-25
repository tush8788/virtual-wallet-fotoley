module.exports.home = function(req,res){
    return res.render('HomePage',{
        title:"Home"
    });
}