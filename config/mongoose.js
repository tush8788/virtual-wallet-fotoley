//import mongoose
const mongoose = require('mongoose');
//env
const dotenv = require('dotenv').config();
//set strict query false means addistional validation is off
mongoose.set('strictQuery',false);
//connect mongodb
mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/virtual-wallet-fotoley');
//got connection 
const db = mongoose.connection;
//handle error event
db.on('error',()=>console.log("Error in connect DB"));
//if connect successfully then fire open event 
db.once('open',()=>console.log("DB Connected..!"));

module.exports=db;