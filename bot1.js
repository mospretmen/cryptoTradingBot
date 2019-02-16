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
//      DATABASE CONFIG
//===============================================================================================================================


var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:qqw3mqw8@ds155651.mlab.com:55651/tradingbot', {
    useNewUrlParser: true
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


// /////////////////////////////////////////////////////// TRX/ETH TRADING BOT ///////////////////////////////////////////////////////

setInterval(function() {
    //GET Chart Data Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
    binance.candlesticks("TRXETH", "5m", (error, ticks, symbol) => {
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
            stdDev : 2
        };

        var inputBB = {
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
        var bollingerBands = BB.calculate(inputBB);
        var bollingerBands3 = BB.calculate(inputBB3);
        var bollingerSpread = bollingerBands[bollingerBands.length - 1].upper / bollingerBands[bollingerBands.length - 1].lower;
        var upper = bollingerBands[bollingerBands.length - 1].upper;
        var middle = bollingerBands[bollingerBands.length - 1].middle;
        var lower = bollingerBands[bollingerBands.length - 1].lower;
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
        var qtyTrade1 = 150;
        var bolSpreadParameter = 1.036;

        //Log Bollinger Bands History (creates json file).
        var bollingerBandsData = fs.readFileSync('./data/TRX/TRXBollingerBandsSpreadHistory.json');
        var bollingerBandsparsedData = JSON.parse(bollingerBandsData);
        var bollingerBandsHistory = bollingerBandsparsedData;

        if (bollingerBandsparsedData[bollingerBandsparsedData.length - 1] != bollingerSpread) {
            bollingerBandsHistory.push(bollingerSpread);
            fs.writeFileSync('./data/TRX/TRXBollingerBandsSpreadHistory.json', JSON.stringify(bollingerBandsHistory, null, " "));
        }
        
        console.log('------------------------------------------------------------');
        console.log('bollinger spread mean + 3x Std dev: ' + colors.yellow((math.mean(bollingerBandsHistory) + (math.std(bollingerBandsHistory)) * 3).toFixed(3)));
        console.log('bollinger spread mean: ' + colors.yellow(math.mean(bollingerBandsHistory).toFixed(3)));
        console.log('bollinger spread Std dev: ' + colors.yellow(math.std(bollingerBandsHistory).toFixed(3)));

        (async function data() {
            let tradeHistoryData = await asyncData.tradeHistoryData.TRX();
            let balances = await asyncData.getBalances();
            let prices = await asyncData.getPriceData();
            let bidAsk = await asyncData.getBidAsk.TRX();

            let result = {
                tradeHistoryData: tradeHistoryData,
                balances: balances,
                prices: prices,
                bidAsk: bidAsk
            };

            return result;
        })().then((result) => {

            if (+ticks[99][4] < lower && +rsi < 38 && bollingerSpread < bolSpreadParameter) {

                setTimeout(function() {
                    binance.cancelOrders("TRXETH", (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Buy: accumulation, price < lower limit'));
                    binance.buy("TRXETH", qtyTrade1, Number(result.bidAsk.bidPrice) + +0.00000001);

                }, 500);

            } else if (+ticks[99][4] < bollingerBands3[bollingerBands3.length - 1].lower &&
                +rsi < 38 &&
                bollingerSpread < bolSpreadParameter) {

                setTimeout(function() {
                    binance.cancelOrders("TRXETH", (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Strong Buy: accumulation, price < lower limit'));
                    binance.buy("TRXETH", qtyTrade1 * 3, Number(result.bidAsk.bidPrice) + +0.0000001);
                }, 500);

            } else if (+ticks[99][4] < simpleMovingAverage100 &&
                +ticks[99][4] < bollingerBands1[bollingerBands1.length - 1].lower &&
                +rsi < 35 &&
                bullish(fivePeriodCandlestickInput) === true) {

                setTimeout(function() {
                    binance.cancelOrders("TRXETH", (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Buy based on bearish Candlestick Pattern.'));
                    binance.buy("TRXETH", qtyTrade1, Number(result.bidAsk.bidPrice) + +0.00000001);
                }, 500);

            } else if (+ticks[99][4] > upper && +rsi > 61 && bollingerSpread < bolSpreadParameter) {

                setTimeout(function() {
                    binance.cancelOrders("TRXETH", (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Sell: accumulation, price > upper limit'));
                    binance.sell("TRXETH", qtyTrade1, Number(result.bidAsk.askPrice) - +0.00000001);

                }, 100);

            } else if (+ticks[99][4] > upper && +rsi > 61 && bollingerSpread > bolSpreadParameter) {

                setTimeout(function() {
                    binance.cancelOrders("TRXETH", (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Delay sell: Bollinger strong, RSI strong, price > upper limit'));
                    binance.sell("TRXETH", qtyTrade1, +(Number(result.bidAsk.askPrice) * 1.002).toFixed(8));

                }, 5000);

            } else if (+ticks[99][4] > simpleMovingAverage100 &&
                +ticks[99][4] > bollingerBands1[bollingerBands1.length - 1].upper &&
                +rsi > 63 &&
                bullish(fivePeriodCandlestickInput) === false) {

                setTimeout(function() {
                    binance.cancelOrders("TRXETH", (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Sell based on bearish Candlestick Pattern.'));
                    binance.sell("TRXETH", qtyTrade1, Number(result.bidAsk.askPrice) - +0.00000001);
                }, 100);

            } else if (
                +ticks[99][4] < lower &&
                +rsi < 38 &&
                +ticks[99][4] < simpleMovingAverage100 &&
                bollingerSpread > bolSpreadParameter
            ) {

                setTimeout(function() {
                    binance.cancelOrders("TRXETH", (error, response, symbol) => {
                        console.log(symbol + " cancel response:", response);
                    });
                    console.log(colors.cyan('Exit entire position.'));
                    binance.marketSell("TRXETH", +(result.balances.TRX.available * 0.99).toFixed(0));

                }, 100);

            } else if (
                +result.balances.ETH.available < 0.2
            ) {
                setTimeout(function() {
                  console.log(colors.cyan('Reduce risk: position is almost 100% bought.'));
                    binance.sell("TRXETH", qtyTrade1 * 5, Number(result.bidAsk.askPrice) - +0.00000001);
                }, 100);

            } else if (
                // ADD more BNB for transaction fees.   
                +result.balances.BNB.available < 1
            ) {
                setTimeout(function() {
                    binance.marketBuy("BNBETH", 1);
                }, 100);

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
            if (Number(close) > bollingerBands[bollingerBands.length - 1].upper) {
                console.log("Last Close: " + colors.green(close));
            } else if (Number(close) < bollingerBands[bollingerBands.length - 1].lower) {
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
            console.log("Upper Limit @Sigma Lvl. " + inputBB.stdDev + " = " + upper.toFixed(8));
            console.log("Lower Limit @Sigma Lvl. " + inputBB.stdDev + " = " + lower.toFixed(8));
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

            console.log(colors.underline(`------------------------ACCOUNT DATA------------------------`).bgBlue);

            // Started Testing Bot with 3.77 Eth on 11/09/2018, 2.14 12/07/2018, 6.19 12/14/2018 (verify ./data/balanceHistory.json)
            var totalETHInvested = 13.10;
            var XRPETHBalance = (+result.balances.XRP.available * +result.prices.XRPETH).toFixed(2);
            var TUSDEthBalance = (+result.balances.TUSD.available * +result.prices.TUSDETH).toFixed(2);
            var bnbEthBalance = (+result.balances.BNB.available * +result.prices.BNBETH).toFixed(2);
            var eosEthBalance = (+result.balances.EOS.available * +result.prices.EOSETH).toFixed(2);
            var trxEthBalance = (+result.balances.TRX.available * +result.prices.TRXETH).toFixed(2);
            var ethBalance = (+result.balances.ETH.available).toFixed(2);
            var totalBalance = +XRPETHBalance + +TUSDEthBalance + +bnbEthBalance + +eosEthBalance + +trxEthBalance + +ethBalance;

            console.log(`XRP balance: ${(+result.balances.XRP.available).toFixed(0)} or ${XRPETHBalance} ETH, ${((+XRPETHBalance/+totalBalance)*100).toFixed(0)} % On Trade`);
            console.log(`TUSD balance: ${(+result.balances.TUSD.available).toFixed(0)} or ${TUSDEthBalance} ETH, ${((+TUSDEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);
            console.log(`BNB balance: ${(+result.balances.BNB.available).toFixed(0)} or ${bnbEthBalance} ETH, ${((+bnbEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);
            console.log(`EOS balance: ${(+result.balances.EOS.available).toFixed(0)} or ${eosEthBalance} ETH, ${((+eosEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);
            console.log(`TRX balance: ${(+result.balances.TRX.available).toFixed(0)} or ${trxEthBalance} ETH, ${((+trxEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);
            console.log("ETH balance:", ethBalance);
            console.log("Total ETH balance:", totalBalance.toFixed(2));
            console.log('Total ETH Invested:', totalETHInvested);
            console.log('Total ETH Profit Or Loss:', (totalBalance - totalETHInvested).toFixed(2));
            var roi = (((+totalBalance / +totalETHInvested) - 1) * 100).toFixed(2);

            if (roi > 0) {
                console.log(colors.bgBlack(`ROI Since Inception ( ${moment("20181109", "YYYYMMDD").fromNow()} ): ` + colors.green(roi + ' %')).bold);
            } else {
                console.log(colors.bgBlack(`ROI Since Inception ( ${moment("20181109", "YYYYMMDD").fromNow()} ): ` + colors.red(roi + ' %')).bold);
            }
            console.log('------------------------------------------------------------' + "\n");
            binance.openOrders(false, (error, openOrders) => {
                console.log("openOrders()", openOrders);
            });


            //Log Balance History (creates json file).
            var data = fs.readFileSync('./data/balanceHistory.json');
            var parsedData = JSON.parse(data);
            var balanceHistory = parsedData;

            if (parsedData[parsedData.length - 1].date != moment().format('MM/DD/YYYY')) {
                balanceHistory.push({
                    date: moment().format('MM/DD/YYYY'),
                    cashFlow: 0,
                    totalBalance: +(+XRPETHBalance + +TUSDEthBalance + +bnbEthBalance + +eosEthBalance + +trxEthBalance + +ethBalance).toFixed(2),
                    totalBalancePlusCashFLow: +(+XRPETHBalance + +TUSDEthBalance + +bnbEthBalance + +eosEthBalance + +trxEthBalance + +ethBalance).toFixed(2)
                });
                fs.writeFileSync('./data/balanceHistory.json', JSON.stringify(balanceHistory, null, " "));
            }
        });

    }, {
        limit: 100,
        endTime: Date.now()
    });
}, 6000);


//===============================================================================================================================
//      SERVER START
//===============================================================================================================================


app.listen(8082, process.env.IP, function() {
    console.log('server start...' + process.env.IP + ":" + 8082);
});