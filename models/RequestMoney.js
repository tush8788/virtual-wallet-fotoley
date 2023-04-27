const mongoose = require('mongoose');

const moneyReqSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    requester:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:['pending','reject','success'],
        default:'pending'
    },
    amount:{
        type:Number,
        default:0,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const RequestMoney = mongoose.model('RequestMoney',moneyReqSchema);

module.exports=RequestMoney;