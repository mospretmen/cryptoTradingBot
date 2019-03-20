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
 
// const apiKey = 'process.env.CoinMarketCap';
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
let tradeInterval = 10000; // Interval of milliseconds bot will analyse price changes. Needs to be > 1000, due to Exchange API limits.
let totalETHInvested = 0.43; // ETH invested 2/19/2019

setInterval(function() {
    
    binance.candlesticks(tradePair, timeFrame, (error, ticks, symbol) => {
        let last_tick = ticks[ticks.length - 1];
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;

        //Create array with last 100 Candlesticks.
        var array200Period = [];
        var arrayVolume = [];

        for (var i = 0; i < 200; i++) {
            array200Period.push(Number(ticks[i][4]));
            arrayVolume.push(+ticks[i][5]);
        }

        // Available parameters to use with Trading strategy (RSI, BolingerBand, SMA, etc...) Look at the technical indicators library for more indicators.
        var fivePeriodCandlestickInput = {
            open: [+ticks[194][1], +ticks[195][1], +ticks[196][1], +ticks[197][1], +ticks[198][1]],
            high: [+ticks[194][2], +ticks[195][2], +ticks[196][2], +ticks[197][2], +ticks[198][2]],
            low: [+ticks[194][3], +ticks[195][3], +ticks[196][3], +ticks[197][3], +ticks[198][3]],
            close: [+ticks[194][4], +ticks[195][4], +ticks[196][4], +ticks[197][4], +ticks[198][4]]
        };
        var inputRSI = {
            values: array200Period,
            period: 14
        };
        var inputBB1 = {
            period : 20, 
            values : array200Period,
            stdDev : 1
        };
        var inputBB2 = {
            period: 20,
            values: array200Period,
            stdDev: 2
        };
        var inputBB3 = {
            period: 20,
            values: array200Period,
            stdDev: 3
        };
        //Calculate RSI (Relative Strength Index), BollingerBands, SMA (Simple Moving Average), ROC (Rate of Change).
        var rsi = RSI.calculate(inputRSI)[RSI.calculate(inputRSI).length - 1];
        var bollingerBands1 = BB.calculate(inputBB1);
        var bollingerBands2 = BB.calculate(inputBB2);
        var bollingerBands3 = BB.calculate(inputBB3);
        var bollingerSpread = bollingerBands2[bollingerBands2.length - 1].upper / bollingerBands2[bollingerBands2.length - 1].lower;
        var upper = bollingerBands2[bollingerBands2.length - 1].upper;
        var middle = bollingerBands2[bollingerBands2.length - 1].middle;
        var lower = bollingerBands2[bollingerBands2.length - 1].lower;
        var simpleMovingAverage200 = SMA.calculate({
            period: 200,
            values: array200Period
        });
        var roc3 = ROC.calculate({period : 3, values : array200Period})[ROC.calculate({period : 3, values : array200Period}).length - 1];
        var roc5 = ROC.calculate({period : 5, values : array200Period})[ROC.calculate({period : 5, values : array200Period}).length - 1];
        var roc8 = ROC.calculate({period : 8, values : array200Period})[ROC.calculate({period : 8, values : array200Period}).length - 1];
        var roc13 = ROC.calculate({period : 13, values : array200Period})[ROC.calculate({period : 13, values : array200Period}).length - 1];
        var roc21 = ROC.calculate({period : 21, values : array200Period})[ROC.calculate({period : 21, values : array200Period}).length - 1];
        var lastVolume = arrayVolume[arrayVolume.length -1];
        var averageVolume = math.mean(arrayVolume);
        var lastPrice = +ticks[199][4];

        (async function data() {
            let tradeHistoryData = await asyncData.tradeHistoryData.IOTA();
            let balances = await asyncData.getBalances();
            let prices = await asyncData.getPriceData();
            let bidAsk = await asyncData.getBidAsk.IOTA();

            let result = {
                tradeHistoryData: tradeHistoryData,
                balances: balances,
                prices: prices,
                bidAsk: bidAsk
            };
            return result;
        })().then((result) => {
            
            var optimalBuyPrice = math.max(lastPrice, +result.bidAsk.bidPrice + +decimalPlaces);
            var optimalSellPrice = math.min(lastPrice, +result.bidAsk.askPrice - +decimalPlaces);
            
            // STRATEGY STARTS HERE! Example below....use the node-binance-api functions on the README.md file to create strategy.
            if (lastPrice < lower && rsi < 38) {

                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Buy: last price < lower limit @ 2sigma'));
                    binance.buy(tradePair, tradeQty, optimalBuyPrice);
                }, 500);
                
            } else if (lastPrice < bollingerBands3[bollingerBands3.length - 1].lower && rsi < 30) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Buy: last price < lower limit @ 3sigma'));
                    binance.buy(tradePair, tradeQty, optimalBuyPrice);
                }, 500);
            
            } else if (rsi < 20) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Strong Buy: RSI < 20'));
                    binance.buy(tradePair, tradeQty * 3, +result.bidAsk.askPrice);
                }, 500);
                
            } else if (lastPrice > upper && rsi > 60) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Sell: last price > upper limit @ 2sigma'));
                    binance.sell(tradePair, tradeQty, optimalSellPrice);
                }, 500);
            
            } else if (rsi > 80) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Strong Sell: RSI > 80'));
                    binance.sell(tradePair, tradeQty * 3, +result.bidAsk.bidPrice);
                }, 500);
                
            } else if (+result.balances.ETH.available < 0.02 ) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Sell: reduce risk, overbought'));
                    binance.sell(tradePair, +(+result.balances.IOTA.available * 0.15).toFixed(0), +result.bidAsk.askPrice - +decimalPlaces);
                }, 500);
                
            // STRATEGY ENDS HERE.
                
            } else if (+result.balances.BNB.available < 0.5 ) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Buying more BNB for fees.'));
                    binance.buy('BNBETH', 0.5, +result.bidAsk.askPrice - +decimalPlaces);
                }, 500);
                
            } else {
                console.log('============================================================');
                console.log(new Date().toLocaleString());
                console.log(colors.cyan('Waiting for trade... => ' + symbol).bold);
            }
            console.log('------------------------------------------------------------');
            if (+close > +simpleMovingAverage200[simpleMovingAverage200.length - 1]) {
                console.log('^^^^^^^^^^^^^^^^^^^^^^^^ Trend is UP ^^^^^^^^^^^^^^^^^^^^^^^^'.bgGreen + "\n");
            } else {
                console.log('________________________ Trend is DOWN ________________________'.bgRed + "\n");
            }
            console.log(colors.underline.cyan(`Price Data =>`).bgBlack.bold);
            if (Number(close) > bollingerBands2[bollingerBands2.length - 1].upper) {
                console.log("Last Close: " + colors.green(close));
            } else if (Number(close) < bollingerBands2[bollingerBands2.length - 1].lower) {
                console.log("Last Close: " + colors.red(close));
            } else {
                console.log("Last Close: " + Number(ticks[199][4]).toFixed(8));
            }
            if (bullish(fivePeriodCandlestickInput) === true) {
                console.log(`Candlestick Pattern Bullish?: ${colors.green(bullish(fivePeriodCandlestickInput)).bold}`);
            } else {
                console.log(`Candlestick Pattern Bullish?: ${colors.red(bullish(fivePeriodCandlestickInput)).bold}`);
            }
            console.log("SMA 200 Period: " + (simpleMovingAverage200[simpleMovingAverage200.length - 1]).toFixed(8));
            console.log("Upper Limit @Sigma Lvl. " + inputBB2.stdDev + " = " + upper.toFixed(8));
            console.log("Lower Limit @Sigma Lvl. " + inputBB2.stdDev + " = " + lower.toFixed(8));
            console.log("Bollinger Bands Spread: " + colors.yellow((((bollingerSpread) - 1) * 100).toFixed(2) + " %"));
            console.log('RSI: ' + colors.yellow(rsi));
            console.log("ROC 3,5,8,13,21 period: " + colors.yellow(`${roc3.toFixed(2)}, ${roc5.toFixed(2)}, ${roc8.toFixed(2)}, ${roc13.toFixed(2)}, ${roc21.toFixed(2)} %`));
            console.log(`Last Volume: ${colors.yellow(lastVolume)}, Average Volume: ${colors.yellow(averageVolume.toFixed(0))}`);
            console.log('------------------------------------------------------------' + "\n");
            console.log(colors.underline.cyan(`${symbol} Trade History Last 500 trades => `).bgBlack.bold + "\n" +
                `Count Buy Trades: ${result.tradeHistoryData[2]} \n` +
                `Count Sell Trades: ${result.tradeHistoryData[5]} \n` +
                `Total Qty Bought: ${result.tradeHistoryData[1]} \n` +
                `Total Qty Sold: ${result.tradeHistoryData[4]} \n` +
                `Weighted Buy Price: ${result.tradeHistoryData[0]} \n` +
                `Weighted Sell Price: ${result.tradeHistoryData[3]} \n` +
                'Total Profit/Loss: ' + ((+result.tradeHistoryData[3] - +result.tradeHistoryData[0]) * Math.min(Number(math.sum(+result.tradeHistoryData[4])), Number(math.sum(+result.tradeHistoryData[1])))).toFixed(4) + ' ETH');

            var mktMakerProfitOrLoss = Number((((((result.tradeHistoryData[3]) / result.tradeHistoryData[0]) - 1) * 100) - 0.2).toFixed(2));
            if (mktMakerProfitOrLoss > 0) {
                console.log("Avg MKT_Maker Spread: " + colors.green(mktMakerProfitOrLoss + ' %').bold);
            } else {
                console.log("Avg MKT_Maker Spread: " + colors.red(mktMakerProfitOrLoss + ' %').bold);
            }
            console.log('------------------------------------------------------------' + "\n");
            console.log(colors.underline.cyan('Account Data =>').bgBlack.bold);
            console.log(`ETH balance: ${numeral(result.balances.ETH.available).format('0.000')}`);
            console.log(`IOTA balance: ${numeral(result.balances.IOTA.available).format('0.0')} or ${(result.balances.IOTA.available*lastPrice).toFixed(2)} ETH`);
            console.log(`Total ETH Invested: ${totalETHInvested}`);
            var totalETHBalance = (+result.balances.ETH.available + +result.balances.IOTA.available*lastPrice).toFixed(3);
            console.log(`Total ETH balance: ${totalETHBalance}`);
            console.log(`Total BNB balance: ${numeral(+result.balances.BNB.available).format('0.00')}`);
            if(((+totalETHBalance/+totalETHInvested)-1) < 0) {
                console.log(`ROI: ${colors.red(numeral((+totalETHBalance/+totalETHInvested)-1).format('%0.000')).bold}`);
            } else {
                console.log(`ROI: ${colors.green(numeral((+totalETHBalance/+totalETHInvested)-1).format('%0.000')).bold}`);
            }
            console.log('------------------------------------------------------------' + "\n");

            binance.openOrders(false, (error, openOrders) => {
                console.log("openOrders()", openOrders);
            });

        });

    }, {
        limit: 200,
        endTime: Date.now()
    });
}, tradeInterval);


//===============================================================================================================================
//      COLLECT DATA
//===============================================================================================================================

setInterval(()=> {
    // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
    binance.candlesticks(tradePair, timeFrame, (error, ticks, symbol) => {
      let last_tick = ticks[ticks.length - 1];
      let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
        
        var newData = new Data15m();
      
        newData.date = moment.unix(+time/1000).format("YYYY-MM-DD");
        newData.time = moment.unix(+time/1000).format('LTS');
        newData.closeTime = moment.unix(+closeTime/1000).format('LTS');
        newData.open = open;
        newData.high = high;
        newData.low = low;
        newData.close = close;
        newData.assetVolume = assetVolume;
        newData.trades = trades;
        newData.buyBaseVolume = buyBaseVolume;
        newData.buyAssetVolume = buyAssetVolume;
        
        // newData.data = ticks;
      
        newData.save((err, docs) => {
            if(err) {
              console.log(err);
            } else {
              return docs;
            }
        });
      
    }, {limit: 500, endTime: Date.now() });
}, 1000*60*15);

Data15mLast500.deleteMany({}, (err, result)=>{
    if(err) {
        console.log(err);
    } else {
        console.log(result);
    }
});

// Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
binance.candlesticks(tradePair, timeFrame, (error, ticks, symbol) => {
  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
    
    var newData = new Data15mLast500();
  
    newData.data = ticks;
  
    newData.save((err, docs) => {
        if(err) {
          console.log(err);
        } else {
          return docs;
        }
    });
  
}, {limit: 500, endTime: Date.now() });


//===============================================================================================================================
//      SERVER START
//===============================================================================================================================


app.listen(8081, process.env.IP, function() {
    console.log('server start...' + process.env.IP + ":" + 8081);
});