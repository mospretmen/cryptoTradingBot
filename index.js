var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var math = require('mathjs');
var moment = require('moment');
var colors = require('colors');
var numeral = require('numeral');
// var route = require("./routes/route.js");
var tradeHistory = require('./data/tradeHistory.json');
var balanceHistory = require('./data/balanceHistory.json');
var depositHistory = require('./data/depositHistory.json');
var withdrawHistory = require('./data/withdrawHistory.json');


app.locals._ = _;
app.locals.moment = moment;
app.locals.numeral = numeral;

//=======================================================================================================================
//      BodyParser + MethodOverride + EJS CONFIG
//===============================================================================================================================


app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));


//=======================================/========================================================================================
//      ROUTES
//===============================================================================================================================

// app.use('/', route);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

//===============================================================================================================================
//      SERVER START
//===============================================================================================================================


app.listen(8082, process.env.IP, function(){
   console.log('server start...' + process.env.IP + ":" + 8082); 
});