const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isPrimiumUser:{
        type:Boolean,
        default:false
    },
    balance:{
        type:Number,
        default:0
    },
    transactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transaction "
        }
    ]
});

const User = mongoose.model('User',userSchema);

module.exports = User;