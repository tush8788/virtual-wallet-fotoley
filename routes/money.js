const express = require('express');
const router = express.Router();
const passport = require('passport');
const moneyController = require('../controller/money_controller');
// const authController = require('../controller/auth_controller');

//Sending Money Page    // only user can send money 
router.get('/sendMoney',passport.checkAuthentication,passport.isUserOrNot,moneyController.sendMoneyPage);

// Sending Money 
router.post('/send-money',passport.checkAuthentication,passport.isUserOrNot,moneyController.sendMoney);

// Requesting Money page 
router.get('/requestMoney',passport.checkAuthentication,passport.isUserOrNot,moneyController.requestingMoneyPage);

// Requesting Money
router.post('/request-money',passport.checkAuthentication,passport.isUserOrNot,moneyController.requestingMoney);

module.exports = router;