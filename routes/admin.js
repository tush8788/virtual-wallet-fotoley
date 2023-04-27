const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controller/auth_controller');
const adminController = require('../controller/admin_controller');

//signin page
router.get('/signin',(req,res,next)=>{
    req.body.url="/admin/create-session";
    req.body.isAdmin=true
    next();
},authController.siginPage);

//signup page
router.get('/signup',(req,res,next)=>{
    req.body.url="/admin/create";
    req.body.isAdmin=true
    next();
},authController.sigupPage);

//create admin
router.post('/create',authController.create);

//create session
router.post('/create-session',passport.authenticate('local',{failureRedirect:"/admin/signin"}),authController.createSession);

//admin dashboard
router.get('/dashboard',passport.checkAuthentication,passport.isAdminOrNot,adminController.dashboard)
module.exports = router;