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

            //adding free credited to his wallet 
            if(user.isPrimiumUser && user.isAdmin==false){
                // console.log("inside isprimium")
               await user.updateOne({balance:2500})
            }
            else if(user.isAdmin==false){
                // console.log("inside non primuam")
               await user.updateOne({balance:1000})
            }

            if(user.isAdmin){
                // console.log("Admin Create Successfully");
                return res.redirect('/admin/signin')
            }
            else{
                // console.log("User Create Successfully");
                return res.redirect('/user/signin')
            }
        }
        console.log("User allready exist");
        if(user.isAdmin){
            return res.redirect('/admin/signin')
        }
        else{
            return res.redirect('/user/signin')
        }
    }
    catch(err){

    }
}

//create session
module.exports.createSession=function(req,res){
    // console.log("session created")
    if(req.user.isAdmin){
        return res.redirect('/admin/dashboard');
    }
    else{
        return res.redirect('/user/dashboard');
    }
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