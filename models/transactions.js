const mongoose = require('mongoose');

const transationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    charges:{
        type:Number,
        default:0
    },
    chargesAmount:{
        type:Number,
        default:0
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

const Transaction = mongoose.model('Transaction',transationSchema);

module.exports=Transaction;