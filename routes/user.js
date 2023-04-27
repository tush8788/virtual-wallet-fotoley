const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controller/auth_controller');
const userController = require('../controller/user_controller');

//signin page
router.get('/signin',(req,res,next)=>{
    req.body.url="/user/create-session";
    req.body.isAdmin=false;
    next();
},authController.siginPage);

//signup page
router.get('/signup',(req,res,next)=>{
    req.body.url="/user/create";
    req.body.isAdmin=false;
    next();
},authController.sigupPage);

//create user
router.post('/create',authController.create);

//create session
router.post('/create-session',passport.authenticate('local',{failureRedirect:"/user/signin"}),authController.createSession)

//user dashboard
router.get('/dashboard',passport.checkAuthentication,passport.isUserOrNot,userController.dashboard);

module.exports = router;