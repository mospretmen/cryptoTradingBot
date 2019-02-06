var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');
var math = require('mathjs');
var moment = require('moment');
var colors = require('colors');


//===============================================================================================================================
//      Binance CONFIG
//===============================================================================================================================


const binance = require('node-binance-api')().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: false // If you want to use sandbox mode where orders are simulated
});

//===============================================================================================================================
//      BodyParser + MethodOverride + EJS CONFIG
//===============================================================================================================================


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//===============================================================================================================================
//      Binance API
//===============================================================================================================================

module.exports.tradeHistoryData = { 
  
  EOS: async function() {
    return new Promise((resolve, reject)=>{
      setTimeout(_=>{
        
        binance.trades("EOSETH", (error, trades, symbol) => {
        
          var x =[];  
          var buyPriceMultQty = [];
          var buyQty = [];
          var sellPriceMultQty = [];
          var sellQty = [];
          
            for (var i = 0; i < trades.length; i++) {
              if(trades[i].isBuyer === true) {
                buyPriceMultQty.push(trades[i].price * trades[i].qty);
                buyQty.push(trades[i].qty);
              } else {
                sellPriceMultQty.push(trades[i].price * trades[i].qty);
                sellQty.push(trades[i].qty);
              }
            }
            x.push(+(math.sum(buyPriceMultQty)/math.sum(buyQty)).toFixed(8));
            x.push(math.sum(buyQty));
            x.push(buyQty.length);
            x.push(+(math.sum(sellPriceMultQty)/math.sum(sellQty)).toFixed(8));
            x.push(math.sum(sellQty));
            x.push(sellQty.length);
            resolve(x);
        });
      }, 100);
    });
  },
  XRP: async function() {
    return new Promise((resolve, reject)=>{
      setTimeout(_=>{
        
        binance.trades("XRPETH", (error, trades, symbol) => {
        
          var x =[];  
          var buyPriceMultQty = [];
          var buyQty = [];
          var sellPriceMultQty = [];
          var sellQty = [];
          
            for (var i = 0; i < trades.length; i++) {
              if(trades[i].isBuyer === true) {
                buyPriceMultQty.push(trades[i].price * trades[i].qty);
                buyQty.push(trades[i].qty);
              } else {
                sellPriceMultQty.push(trades[i].price * trades[i].qty);
                sellQty.push(trades[i].qty);
              }
            }  
            x.push(+(math.sum(buyPriceMultQty)/math.sum(buyQty)).toFixed(8));
            x.push(math.sum(buyQty));
            x.push(buyQty.length);
            x.push(+(math.sum(sellPriceMultQty)/math.sum(sellQty)).toFixed(8));
            x.push(math.sum(sellQty));
            x.push(sellQty.length);
            resolve(x);
        });
      }, 100);
    });
  },
  TRX: async function() {
    return new Promise((resolve, reject)=>{
      setTimeout(_=>{
        
        binance.trades("TRXETH", (error, trades, symbol) => {
        
          var x =[];  
          var buyPriceMultQty = [];
          var buyQty = [];
          var sellPriceMultQty = [];
          var sellQty = [];
          
            for (var i = 0; i < trades.length; i++) {
              if(trades[i].isBuyer === true) {
                buyPriceMultQty.push(trades[i].price * trades[i].qty);
                buyQty.push(trades[i].qty);
              } else {
                sellPriceMultQty.push(trades[i].price * trades[i].qty);
                sellQty.push(trades[i].qty);
              }
            }  
            x.push(+(math.sum(buyPriceMultQty)/math.sum(buyQty)).toFixed(8));
            x.push(math.sum(buyQty));
            x.push(buyQty.length);
            x.push(+(math.sum(sellPriceMultQty)/math.sum(sellQty)).toFixed(8));
            x.push(math.sum(sellQty));
            x.push(sellQty.length);
            resolve(x);
        });
      }, 100);
    });
  }
  
};

module.exports.getBalances = async function() {
  
  return new Promise((resolve, reject) => {
    setTimeout(_=>{
      
      binance.balance((error, balances) => {
        if ( error ) return console.error(error);
          resolve(balances);
      });
    }, 100);
  });
  
};

module.exports.getPriceData =async function() {
  
  return new Promise((resolve, reject) => {
    setTimeout(_=> {
      
      binance.prices((error, ticker) => {
        resolve(ticker);
      });
            
    }, 100);
  });
};

module.exports.getBidAsk = {
  
  EOS: async function() {
    return new Promise((resolve, reject) => {
      setTimeout(_=> {
        
        binance.bookTickers('EOSETH',(error, ticker) => {
          resolve(ticker);
        });
              
      }, 100);
    });
  },
    TRX: async function() {
    return new Promise((resolve, reject) => {
      setTimeout(_=> {
        
        binance.bookTickers('TRXETH',(error, ticker) => {
          resolve(ticker);
        });
              
      }, 100);
    });
  },
    XRP: async function() {
    return new Promise((resolve, reject) => {
      setTimeout(_=> {
        
        binance.bookTickers('XRPETH',(error, ticker) => {
          resolve(ticker);
        });
              
      }, 100);
    });
  }
};

module.exports.getCandlesticks = {
  
  XRP: async function() {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
          binance.candlesticks("XRPETH", "30m", (error, ticks, symbol) => {
            ticks;
            let last_tick = ticks[ticks.length - 1];
            let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
              resolve(ticks);
          }, {limit: 500, endTime: Date.now()});
        }, 100);
      });
    }
};

module.exports.getMarketDepth = {
  
  XRP: async function() {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
          binance.depth("XRPETH", (error, depth, symbol) => {
            resolve(depth);
          });
        }, 100);
      });
    }
};