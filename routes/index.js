const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
const authController = require('../controller/auth_controller');

//home
router.get('/',homeController.home);

//signout
router.get('/signout',authController.signout);

//admin
router.use('/admin',require('./admin'));

//user
router.use('/user',require('./user'));

//money
router.use('/money',require('./money'));

module.exports = router;