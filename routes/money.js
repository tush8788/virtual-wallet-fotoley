const express = require('express');
const router = express.Router();
const passport = require('passport');
const moneyController = require('../controller/money_controller');
// const authController = require('../controller/auth_controller');

//send money page    // only user can send money 
router.get('/sendMoney',passport.checkAuthentication,passport.isUserOrNot,moneyController.sendMoneyPage);

//send money
router.post('/send-money',passport.checkAuthentication,passport.isUserOrNot,moneyController.sendMoney);
module.exports = router;