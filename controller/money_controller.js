const UserDB = require('../models/user');
const TransactionDB = require('../models/transactions');
const RequestMoneyDB = require('../models/RequestMoney');
const axios = require('axios');

//send money page
module.exports.sendMoneyPage = async function (req, res) {
    try {
        let users = await UserDB.find({ email: { $ne: req.user.email }, isAdmin: { $ne: true } }).select('email');
        // console.log(users);
        return res.render('./user/sendMoney', {
            title: "Send Money",
            users
        })

    }
    catch (err) {

    }
}

//send money
module.exports.sendMoney = async function (req, res) {
    try {
        console.log(req.body);
        //find admin
        let Admin = await UserDB.findOne({ isAdmin: true });
        //login user and req send user same or not
        if (req.user.email != req.body.sender) {
            console.log("Requested user and login user not match");
            return res.redirect('back');
        }
        //sender find in DB
        let sender = await UserDB.findById(req.user.id);

        //reciver find in DB
        let receiver = await UserDB.findById(req.body.receiver);

        if (!receiver) {
            console.log("Recever user not found");
            return res.redirect('back');
        }

        //calculte sender charges 
        let senderCharges = sender.isPrimiumUser ? 3 : 5;
        let senderChargeAmount = req.body.amount / 100 * senderCharges;
        let newSenderBalance = (sender.balance - req.body.amount) - senderChargeAmount;

        if (newSenderBalance < 0) {
            console.log("insufficent balance");
            return res.redirect('back');
        }
        req.body.sender = req.user.id;
        req.body.charges = senderCharges;
        req.body.chargesAmount = senderChargeAmount;

        //calculate reciver charges
        let reciverCharges = 1
        let reciverChargeAmount = req.body.amount / 100 * reciverCharges;
        let newReciverBalance = req.body.amount - reciverChargeAmount;
        newReciverBalance = receiver.balance + newReciverBalance;

        //genrate transations 
        //main transation
        let mainTransation = await TransactionDB.create(req.body);
        //sender charges transation 
        let senderChargesTransation = await TransactionDB.create({
            sender: sender._id,
            receiver: Admin._id,
            amount: senderChargeAmount,
            message: `Charges Recived form ${sender.email}`
        });
        //reciver charges transation 
        let reciverChargesTransation = await TransactionDB.create({
            sender: receiver._id,
            receiver: Admin.id,
            amount: reciverChargeAmount,
            message: `Charges Recived form ${receiver.email}`
        });

        //update sender and reciver balance and transation id's
        await UserDB.findByIdAndUpdate(
            sender._id,
            {
                balance: newSenderBalance,
                $push: { transactions: { $each: [mainTransation, senderChargesTransation] } }
            }
        );

        await UserDB.findByIdAndUpdate(
            receiver._id,
            {
                balance: newReciverBalance,
                $push: { transactions: { $each: [mainTransation, reciverChargesTransation] } }
            }
        );
        let adminBalance = parseInt(Admin.balance) + (parseInt(senderChargeAmount) + parseInt(reciverChargeAmount));
        await UserDB.findByIdAndUpdate(
            Admin._id,
            {
                balance: adminBalance,
                $push: { transactions: { $each: [senderChargesTransation, reciverChargesTransation] } }
            });

        if (req.xhr) {
            return res.status(200).json({
                status: "success"
            })
        }
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
    }
}

//Requesting Money Page
module.exports.requestingMoneyPage = async function (req, res) {
    try {
        let users = await UserDB.find({ email: { $ne: req.user.email }, isAdmin: { $ne: true } }).select('email');
        let allMoneyReq = await UserDB.findById(req.user.id)
            .populate({
                path: 'moneyRequest',
                populate: { path: 'sender requester' },
            },
            ).exec();

        return res.render('./user/requestingMoney', {
            title: "Requesting Money",
            users,
            allMoneyReq
        })
    }
    catch (err) {

    }
}

//Requesting Money
module.exports.requestingMoney = async function (req, res) {
    try {
        // console.log(req.body);
        req.body.sender = req.user.id;
        let moneyReq = await RequestMoneyDB.create(req.body);
        // console.log(moneyReq);
        await UserDB.findByIdAndUpdate(req.body.sender, { $push: { moneyRequest: moneyReq } })
        await UserDB.findByIdAndUpdate(req.body.requester, { $push: { moneyRequest: moneyReq } })

        // console.log(req.body);
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
    }
}

//update req money status
module.exports.reqMoneyStatus = async function (req, res) {
    try {
        // console.log(req.query);
        await RequestMoneyDB.findOneAndUpdate({ _id:req.query.id,requester: req.user.id }, { status: req.query.status });
        if (req.query.status == "success") {

            req.body = {
                receiver: req.query.receiver,
                sender: req.user.email,
                message: "money request",
                amount: req.query.amount
            }
            //making req
            let Admin = await UserDB.findOne({ isAdmin: true });
            //sender find in DB
            let sender = await UserDB.findById(req.user.id);

            //reciver find in DB
            let receiver = await UserDB.findById(req.query.receiver);

            //calculte sender charges 
            let senderCharges = sender.isPrimiumUser ? 3 : 5;
            let senderChargeAmount = req.query.amount / 100 * senderCharges;
            let newSenderBalance = (sender.balance - req.query.amount) - senderChargeAmount;

            if (newSenderBalance < 0) {
                console.log("insufficent balance");
                return res.redirect('back');
            }
            req.body.sender = req.user.id;
            req.body.charges = senderCharges;
            req.body.chargesAmount = senderChargeAmount;

            //calculate reciver charges
            let reciverCharges = 1
            let reciverChargeAmount = req.body.amount / 100 * reciverCharges;
            let newReciverBalance = req.body.amount - reciverChargeAmount;
            newReciverBalance = receiver.balance + newReciverBalance;

            //genrate transations 
            //main transation
            let mainTransation = await TransactionDB.create(req.body);
            //sender charges transation 
            let senderChargesTransation = await TransactionDB.create({
                sender: sender._id,
                receiver: Admin._id,
                amount: senderChargeAmount,
                message: `Charges Recived form ${sender.email}`
            });
            //reciver charges transation 
            let reciverChargesTransation = await TransactionDB.create({
                sender: receiver._id,
                receiver: Admin.id,
                amount: reciverChargeAmount,
                message: `Charges Recived form ${receiver.email}`
            });

            //update sender and reciver balance and transation id's
            await UserDB.findByIdAndUpdate(
                sender._id,
                {
                    balance: newSenderBalance,
                    $push: { transactions: { $each: [mainTransation, senderChargesTransation] } }
                }
            );

            await UserDB.findByIdAndUpdate(
                receiver._id,
                {
                    balance: newReciverBalance,
                    $push: { transactions: { $each: [mainTransation, reciverChargesTransation] } }
                }
            );
            let adminBalance = parseInt(Admin.balance) + (parseInt(senderChargeAmount) + parseInt(reciverChargeAmount));
            await UserDB.findByIdAndUpdate(
                Admin._id,
                {
                    balance: adminBalance,
                    $push: { transactions: { $each: [senderChargesTransation, reciverChargesTransation] } }
                });


            // console.log(reqStatus);
        }
        return res.redirect('back');
    }
    catch (err) {
        console.log(err)
    }
}