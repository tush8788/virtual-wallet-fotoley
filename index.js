const express = require('express');
const port = process.env.PORT||8000;

const app = express();

app.set('view engine','ejs');

app.set('views','./view');

app.use(express.urlencoded({extended:false}));

app.use('/',require('./routes/index'))

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
        console.log("Server is up on port ",port);
})