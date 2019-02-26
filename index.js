var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var math = require('mathjs');
var moment = require('moment');
var numeral = require('numeral');

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

app.listen(8080, process.env.IP, function(){
   console.log('server start...' + process.env.IP + ":" + 8080); 
});