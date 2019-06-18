var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var moment = require('moment');
var numeral = require('numeral');
var mongoose = require('mongoose');
var Data15mLast500 = require('./models/data15mLast500.js');
var Data15m = require('./models/data15m.js');

app.locals._ = _;
app.locals.moment = moment;
app.locals.numeral = numeral;

//===============================================================================================================================
//      MLAB DATABASE CONFIG 
//===============================================================================================================================

const dbRoute = process.env.MLAB;
mongoose.connect(dbRoute, { useNewUrlParser: true});
let db = mongoose.connection;

db.once('open', () => console.log('db connected'));
db.on('error', console.error.bind(console, 'monogdb connection error:'));

//=======================================================================================================================
//      BodyParser + MethodOverride + EJS CONFIG
//===============================================================================================================================

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

//===============================================================================================================================
//      Binance CONFIG
//===============================================================================================================================

const binance = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
    test: false // If you want to use sandbox mode where orders are simulated
});

//=======================================/========================================================================================
//      ROUTES
//===============================================================================================================================

// app.use('/', route);
app.get('/', (req, res) => {
    
        binance.trades('IOTAETH', (error, trades, symbol) => {
        
        Data15mLast500.find({}).exec(function(err, docs){
            if (err) return err;
            Data15m.find({}, function(err, docs2){
                if (err) return err;
                res.render('index',{
                    docs: docs, 
                    docs2: docs2, 
                    trades: trades
                    
                });
            });
        });
    });
});

//===============================================================================================================================
//      SERVER START
//===============================================================================================================================

app.listen(8080, process.env.IP, function(){
   console.log('server start...' + process.env.IP + ":" + 8080); 
});