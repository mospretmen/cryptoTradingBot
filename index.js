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

//===============================================================================================================================
//      Binance CONFIG
//===============================================================================================================================


const binance = require('node-binance-api')().options({
  APIKEY: 'KkzLIQ4Je2UwkehagnIaY5Jk1tsY4Yo3BAZqUy6WcydDtF4jtXTftHmXVtVUs5u9',
  APISECRET: 'Z5nxpN8xbj1gQ27bEgTANgOGGd8JzsZVOKdgnOy3ta18Tfh6itJGiA9eDmYUwn7f',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: false // If you want to use sandbox mode where orders are simulated
});


//===============================================================================================================================
//      DATABASE CONFIG
//===============================================================================================================================


var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:qqw3mqw8@ds155651.mlab.com:55651/tradingbot', { useNewUrlParser: true });


//===============================================================================================================================
//      BodyParser + MethodOverride + EJS CONFIG
//===============================================================================================================================


app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));


//===============================================================================================================================
//      DATA COLLECTION: Back Testing Data
//===============================================================================================================================


binance.candlesticks("XRPETH", "3m", (error, ticks, symbol) => {
  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
  fs.writeFileSync('./data/XRP/XRPETHHistory3m.json', JSON.stringify(ticks,null, " "));
}, {limit: 500, endTime: Date.now()});


binance.candlesticks("XRPETH", "5m", (error, ticks, symbol) => {
  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
  fs.writeFileSync('./data/XRP/XRPETHHistory5m.json', JSON.stringify(ticks,null, " "));
}, {limit: 500, endTime: Date.now()});


//=======================================/========================================================================================
//      ROUTES
//===============================================================================================================================

// app.use('/', route);

app.get('/', (req, res) => {
    res.render('index.ejs', 
      {
        tradeHistory: JSON.parse(fs.readFileSync('./data/tradeHistory.json')), 
        balanceHistory: JSON.parse(fs.readFileSync('./data/balanceHistory.json')), 
      } 
    );
});

//===============================================================================================================================
//      SERVER START
//===============================================================================================================================


app.listen(8082, process.env.IP, function(){
   console.log('server start...' + process.env.IP + ":" + 8082); 
});