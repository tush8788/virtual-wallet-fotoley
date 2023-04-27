const UserDB = require('../models/user');

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

//create user or admin
module.exports.create=async function(req,res){
    try{
        // console.log(req.body);
        if(req.body.password != req.body.confirmPassword){
            console.log("password and confirm password not match");
            return res.redirect('back');
        }

        let user = await UserDB.findOne({email:req.body.email});

        if(!user){
            user = await UserDB.create(req.body);
            if(user.isAdmin){
                console.log("Admin Create Successfully");
                return res.redirect('/admin/signin')
            }
            else{
                console.log("User Create Successfully");
                return res.redirect('/user/signin')
            }
        }
        console.log("User allready exist");
    }
    catch(err){

    }
}

//create session
module.exports.createSession=function(req,res){
    // console.log("session created")
    return res.redirect('/');
}

//signout
module.exports.signout=function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('/');
    })
}