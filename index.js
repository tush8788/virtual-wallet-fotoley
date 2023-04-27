const express = require('express');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport')
const localStrategy = require('./config/passport-local-strategy');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './view');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(expressLayout);

app.use(express.static('./assets'));

app.use(express.urlencoded({ extended: false }));

app.use(expressSession({
    name: "Fotolay",
    secret: "FotolaySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/virtual-wallet-fotoley',
        autoRemove: false
    }, function (err) {
        console.log(err || "connect successfully");
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Server is up on port ", port);
})