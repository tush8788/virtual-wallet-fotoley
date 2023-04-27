const express = require('express');
const router = express.Router();
const authController = require('../controller/auth_controller');

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

module.exports = router;