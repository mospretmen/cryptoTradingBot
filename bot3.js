var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var math = require('mathjs');
var moment = require('moment');
var colors = require('colors');
var SMA = require('technicalindicators').SMA;
var RSI = require('technicalindicators').RSI;
var ROC = require('technicalindicators').ROC;
var BB = require('technicalindicators').BollingerBands;
var bullish = require('technicalindicators').bullish;
var bearish = require('technicalindicators').bearish;
var asyncData = require("./asyncData.js");
var mongoose = require('mongoose');
var Data15m = require('./models/data15m.js');
var BalanceHist = require('./models/balanceHist.js');
var Data15mLast500 = require('./models/data15mLast500.js');
var numeral = require('numeral');

//===============================================================================================================================
//      MLAB DATABASE CONFIG 
//===============================================================================================================================


const dbRoute = process.env.MLAB;
mongoose.connect(dbRoute, { useNewUrlParser: true});
let db = mongoose.connection;

db.once('open', () => console.log('db connected'));
db.on('error', console.error.bind(console, 'monogdb connection error:'));



//===============================================================================================================================
//      Cobinhood CONFIG
//===============================================================================================================================


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW5faWQiOiJmYmIxMTA4Ni0xOWMyLTRjMWItYjc3YS0yNjViMDgzMDZkM2IiLCJzY29wZSI6WyJzY29wZV9leGNoYW5nZV90cmFkZV9yZWFkIiwic2NvcGVfZXhjaGFuZ2VfdHJhZGVfd3JpdGUiLCJzY29wZV9leGNoYW5nZV9sZWRnZXJfcmVhZCJdLCJ1c2VyX2lkIjoiZGIxNWUwZGYtMTYxZi00NzFhLTgzMmYtMmU1NzU3MTQyNGEwIn0.uP0jHIHrzNPgAq3oZEpCzPga8cBhRhAE9I6o0-ZakJg.V2:5275aff4352c4307e0cd6ec283e4ce3bab63705340d4d5be52e4fc4765b913bc

const cobinhood = require('node-cobinhood-api');
 
cobinhood.options({
    'apiKey': process.env.Cobinhood, 
    'verbose': true
});

//===============================================================================================================================
//      BodyParser + MethodOverride + EJS CONFIG
//===============================================================================================================================


app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

//===============================================================================================================================
//      CoinMarketCap API
//===============================================================================================================================

// const CoinMarketCap = require('coinmarketcap-api');
 
// const apiKey = '7b72b567-df01-43cc-8d78-56a7bb24af68';
// const client = new CoinMarketCap(apiKey);
 
// setInterval( 

//     client.getQuotes({symbol: ['BTC', 'ETH']}).then(console.log).catch(console.error)

// , 10000);

//===============================================================================================================================
//      Binance API - IOTA ETH BOT
//===============================================================================================================================

let tradePair = 'IOTAETH';
let tradeQty = 5;
let timeFrame = '15m'; // Trading Period: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
let decimalPlaces = 0.00000001; // Number of decimal places on tradingPair
let tradeInterval = 10000; // Interval of milliseconds bot will analyse price changes. Needs to be > 5000, due to Exchange API limits.
let totalETHInvested = 0.43; // ETH invested

setInterval(() => {
    
    cobinhood.lastPrice("COB-BTC", (error, lastPrice) => {
        if (!error) {
            console.log("COB-BTC last price:", lastPrice);
            // COB-BTC last price: 0.00001687
        }
    });

}, tradeInterval);


//===============================================================================================================================
//      COLLECT DATA
//===============================================================================================================================



//===============================================================================================================================
//      SERVER START
//===============================================================================================================================


app.listen(8082, process.env.IP, function() {
    console.log('server start...' + process.env.IP + ":" + 8082);
});