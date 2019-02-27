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
var Data15 = require('./models/data15.js');
var Data30 = require('./models/data30.js');

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
//      Binance API
//===============================================================================================================================


///////////////////////////////////////////////////////// TRX/ETH TRADING BOT ///////////////////////////////////////////////////////

let tradePair = 'IOTAETH';
let tradeQty = 5;
let timeFrame = '15m'; // Trading Period: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
let decimalPlaces = 0.00000001; // Number of decimal places on tradingPair
let tradeInterval = 5000; // Interval of milliseconds bot will analyse price changes.

setInterval(function() {
    binance.candlesticks(tradePair, timeFrame, (error, ticks, symbol) => {
        
        // console.log("candlesticks()", ticks, ticks[19][4]);
        let last_tick = ticks[ticks.length - 1];
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;

        //Create array with last 100 Candlesticks.
        var array100Period = [];
        var arrayVolume = [];

        for (var i = 0; i < 100; i++) {
            array100Period.push(Number(ticks[i][4]));
            arrayVolume.push(+ticks[i][5]);
        }

        // Available parameters to use with Trading strategy (RSI, BolingerBand, SMA, etc...) Look at the technical indicators library for more indicators.
        var fivePeriodCandlestickInput = {
            open: [+ticks[94][1], +ticks[95][1], +ticks[96][1], +ticks[97][1], +ticks[98][1]],
            high: [+ticks[94][2], +ticks[95][2], +ticks[96][2], +ticks[97][2], +ticks[98][2]],
            low: [+ticks[94][3], +ticks[95][3], +ticks[96][3], +ticks[97][3], +ticks[98][3]],
            close: [+ticks[94][4], +ticks[95][4], +ticks[96][4], +ticks[97][4], +ticks[98][4]]
        };
        var inputRSI = {
            values: array100Period,
            period: 14
        };
        var inputBB1 = {
            period : 20, 
            values : array100Period,
            stdDev : 1
        };
        var inputBB2 = {
            period: 20,
            values: array100Period,
            stdDev: 2
        };
        var inputBB3 = {
            period: 20,
            values: array100Period,
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
        var simpleMovingAverage100 = SMA.calculate({
            period: 100,
            values: array100Period
        });
        var roc5 = ROC.calculate({period : 5, values : array100Period})[ROC.calculate({period : 5, values : array100Period}).length - 1];
        var roc10 = ROC.calculate({period : 10, values : array100Period})[ROC.calculate({period : 10, values : array100Period}).length - 1];
        var roc20 = ROC.calculate({period : 20, values : array100Period})[ROC.calculate({period : 20, values : array100Period}).length - 1];
        var roc40 = ROC.calculate({period : 40, values : array100Period})[ROC.calculate({period : 40, values : array100Period}).length - 1];
        var roc99 = ROC.calculate({period : 99, values : array100Period})[ROC.calculate({period : 99, values : array100Period}).length - 1];
        var lastVolume = arrayVolume[arrayVolume.length -1];
        var averageVolume = math.mean(arrayVolume);
        var lastPrice = +ticks[99][4];

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
            
            console.log(result.balances.ETH.available)
            
            // STRATEGY GOES HERE! Example below....use the node-binance-api functions on the README.md file to create strategy.
            if (lastPrice < lower && rsi < 38) {

                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Buy: last price < lower limit @ 2sigma'));
                    binance.buy(tradePair, tradeQty, +result.bidAsk.bidPrice + +decimalPlaces);
                }, 500);
                
            } else if (lastPrice < bollingerBands3[bollingerBands3.length - 1].upper && rsi < 38) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Sell: last price < lower limit @ 2sigma'));
                    binance.buy(tradePair, tradeQty, +result.bidAsk.bidPrice - +decimalPlaces);
                }, 500);
                
            } else if (lastPrice > upper && rsi > 60) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Sell: last price < lower limit @ 2sigma'));
                    binance.sell(tradePair, tradeQty, +result.bidAsk.bidPrice - +decimalPlaces);
                }, 500);
                
            } else if (+result.balances.ETH.available < 0.05 ) {
                
                setTimeout(function() {
                    binance.cancelOrders(tradePair, (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Sell: reduce risk, overbought'));
                    binance.sell(tradePair, tradeQty * 3, +result.bidAsk.bidPrice - +decimalPlaces);
                }, 500);
                
            } else {
                console.log('============================================================');
                console.log(new Date().toLocaleString());
                console.log(colors.cyan('Waiting for trade... => ' + symbol).bold);
            }
            console.log('------------------------------------------------------------');
            if (+close > +simpleMovingAverage100[simpleMovingAverage100.length - 1]) {
                console.log('^^^^^^^^^^^^^^^^^^^^^^^^ Trend is UP ^^^^^^^^^^^^^^^^^^^^^^^^'.bgGreen + "\n");
            } else {
                console.log('________________________ Trend is DOWN ________________________'.bgRed + "\n");
            }
            console.log(colors.underline(`Price Data =>`));
            if (Number(close) > bollingerBands2[bollingerBands2.length - 1].upper) {
                console.log("Last Close: " + colors.green(close));
            } else if (Number(close) < bollingerBands2[bollingerBands2.length - 1].lower) {
                console.log("Last Close: " + colors.red(close));
            } else {
                console.log("Last Close: " + Number(ticks[99][4]).toFixed(8));
            }
            if (bullish(fivePeriodCandlestickInput) === true) {
                console.log(`Candlestick Pattern Bullish?: ${colors.green(bullish(fivePeriodCandlestickInput))}`);
            } else {
                console.log(`Candlestick Pattern Bullish?: ${colors.red(bullish(fivePeriodCandlestickInput))}`);
            }
            console.log("SMA 100 Period: " + (simpleMovingAverage100[simpleMovingAverage100.length - 1]).toFixed(8));
            console.log("Upper Limit @Sigma Lvl. " + inputBB2.stdDev + " = " + upper.toFixed(8));
            console.log("Lower Limit @Sigma Lvl. " + inputBB2.stdDev + " = " + lower.toFixed(8));
            console.log("Bollinger Bands Spread: " + colors.yellow((((bollingerSpread) - 1) * 100).toFixed(2) + " %"));
            console.log('RSI: ' + colors.yellow(rsi));
            console.log("ROC 5,10,20,40,99 period: " + colors.yellow(`${roc5.toFixed(2)}, ${roc10.toFixed(2)}, ${roc20.toFixed(2)}, ${roc40.toFixed(2)}, ${roc99.toFixed(2)} %`));
            console.log(`Last Volume: ${colors.yellow(lastVolume)}, Average Volume: ${colors.yellow(averageVolume.toFixed(0))}`);
            console.log('------------------------------------------------------------' + "\n");
            console.log(colors.underline(`${symbol} Trade History Last 500 trades => `) + "\n" +
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
            binance.openOrders(false, (error, openOrders) => {
                console.log("openOrders()", openOrders);
            });

        });

    }, {
        limit: 100,
        endTime: Date.now()
    });
}, tradeInterval);


//===============================================================================================================================
//      COLLECT DATA
//===============================================================================================================================

// Data15.deleteMany({}, (err, result)=>{
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });


// Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
binance.candlesticks(tradePair, timeFrame, (error, ticks, symbol) => {
  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
    
    var newData = new Data15();
  
    // newData.time = time;
    // newData.open = open;
    // newData.high = high;
    // newData.low = low;
    // newData.close = close;
    // newData.closeTime = closeTime;
    // newData.assetVolume = assetVolume;
    // newData.trades = trades;
    // newData.buyBaseVolume = buyBaseVolume;
    // newData.buyAssetVolume = buyAssetVolume;
    
    newData.data = ticks;
  
    newData.save((err, docs) => {
        if(err) {
          console.log(err);
        } else {
          return docs;
        }
    });
  
}, {limit: 500, startTime: Date.now() - 1000*60*15*3000 ,endTime: Date.now() });


//===============================================================================================================================
//      SERVER START
//===============================================================================================================================


app.listen(8081, process.env.IP, function() {
    console.log('server start...' + process.env.IP + ":" + 8081);
});