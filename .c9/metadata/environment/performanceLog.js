{"filter":false,"title":"performanceLog.js","tooltip":"/performanceLog.js","undoManager":{"mark":9,"position":9,"stack":[[{"start":{"row":260,"column":14},"end":{"row":260,"column":15},"action":"remove","lines":["1"],"id":2}],[{"start":{"row":260,"column":14},"end":{"row":260,"column":15},"action":"insert","lines":["2"],"id":3}],[{"start":{"row":261,"column":61},"end":{"row":261,"column":62},"action":"remove","lines":["1"],"id":4}],[{"start":{"row":261,"column":61},"end":{"row":261,"column":62},"action":"insert","lines":["2"],"id":5}],[{"start":{"row":52,"column":0},"end":{"row":52,"column":131},"action":"remove","lines":["/////////////////////////////////////////////////////// EOS/ETH TRADING BOT ///////////////////////////////////////////////////////"],"id":6},{"start":{"row":51,"column":0},"end":{"row":52,"column":0},"action":"remove","lines":["",""]},{"start":{"row":50,"column":0},"end":{"row":51,"column":0},"action":"remove","lines":["",""]},{"start":{"row":49,"column":129},"end":{"row":50,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":50,"column":0},"end":{"row":237,"column":9},"action":"remove","lines":["","setInterval(function(){","  //GET Chart Data","  binance.candlesticks(\"EOSETH\", \"3m\", (error, ticks, symbol) => {","    // console.log(\"candlesticks()\", ticks, ticks[19][4]);","    let last_tick = ticks[ticks.length - 1];","    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;","    ","      //Compare Technical Indicators","      ","      var array20Period = new Array(); ","      ","      for (var i = 0; i < 20; i++) {","        array20Period.push(Number(ticks[i][4]));","      }","      ","      var sigmaBuy = 2.05;","      var sigmaSell = 2;","      var avg20Period = +math.mean(array20Period).toFixed(6);","      var std20Period = +math.std(array20Period);","      var upperLimit = +(avg20Period + (std20Period * sigmaSell)).toFixed(6);","      var lowerLimit = +(avg20Period - (std20Period * sigmaBuy)).toFixed(6);","","        if(Number(ticks[19][4]).toFixed(6) <= lowerLimit) {","        ","        // Execute Trade Based on Technical Indicator Condition. ","        setTimeout(function(){  ","          ","          binance.cancelOrders(\"EOSETH\", (error, response, symbol) => {","            console.log(symbol+\" cancel response:\", response);","          });","          ","          var quantityBuy = 0.7;","          binance.buy(\"EOSETH\", quantityBuy, Number(ticks[19][4]).toFixed(6));","          ","        },1000);","          ","        } else if (Number(ticks[19][4]).toFixed(6) >= upperLimit) {","          ","        setTimeout(function(){    ","          ","          binance.cancelOrders(\"EOSETH\", (error, response, symbol) => {","            console.log(symbol+\" cancel response:\", response);","          });","          ","          var quantitySell = 0.7;","          binance.sell(\"EOSETH\", quantitySell, Number(ticks[19][4]).toFixed(6));","          ","        },1000);  ","          ","        } else {","          ","    console.log('============================================================');      ","    console.log(new Date().toLocaleString()); console.log(colors.cyan('Waiting for trade... => ' + symbol).bold)}","    console.log('------------------------------------------------------------');","      if( +close > +avg20Period) {console.log('^^^^^^^^^^^^^^^^^^^^^^^^ Trend is UP ^^^^^^^^^^^^^^^^^^^^^^^^'.bgGreen + \"\\n\")} ","      else {console.log('________________________ Trend is DOWN ________________________'.bgRed + \"\\n\")} ","    console.log(colors.underline(`Price Data =>`));","    console.log(\"Last Close: \" + Number(close).toFixed(6));","    console.log(\"Avg 20 Period: \" + avg20Period);","    console.log(\"Upper Limit @Sigma Lvl. \" + sigmaSell + \" = \" + upperLimit);","    console.log(\"Lower Limit @Sigma Lvl. \" + sigmaBuy + \" = \" + lowerLimit);","    console.log('------------------------------------------------------------' + \"\\n\");","    ","      binance.trades(\"EOSETH\", (error, trades, symbol) => {","        ","        ","        binance.prices((error, ticker) => {","          binance.balance((error, balances) => {","            if ( error ) return console.error(error);","            console.log(colors.underline(`Account Data =>`));","            ","            // Started Testing Bot with 3.77 Eth on 11/09/2018, 2.14 12/07/2018, 6.19 12/14/2018","            var totalETHInvested = 11.98;","            var batEthBalance = (Number(balances.BAT.available) * Number(ticker.BATETH)).toFixed(2);","            var eosEthBalance = (Number(balances.EOS.available) * Number(ticker.EOSETH)).toFixed(2);","            var ethBalance = (Number(balances.ETH.available)).toFixed(2);","            var totalBalance = +batEthBalance + +eosEthBalance + +ethBalance;","            ","            console.log(`BAT balance: ${(+balances.BAT.available).toFixed(0)} or ${batEthBalance} ETH, ${((+batEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);","            console.log(`EOS balance: ${(+balances.EOS.available).toFixed(0)} or ${eosEthBalance} ETH, ${((+eosEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);","            console.log(\"ETH balance:\", ethBalance);","            console.log(\"Total ETH balance:\", totalBalance.toFixed(2));","            console.log('Total ETH Invested:', totalETHInvested);","            console.log('Total ETH Profit Or Loss:', (totalBalance - totalETHInvested).toFixed(2));","            var roi = (((+totalBalance/+totalETHInvested)-1)*100).toFixed(2);","          ","              if( roi > 0 ) {","                console.log(colors.bgBlack(`ROI Since Inception ( ${moment(\"20181109\", \"YYYYMMDD\").fromNow()} ): ` + colors.green(roi  + ' %')).bold);","              } else {","                console.log(colors.bgBlack(`ROI Since Inception ( ${moment(\"20181109\", \"YYYYMMDD\").fromNow()} ): ` + colors.red(roi  + ' %')).bold);","              }","            console.log('------------------------------------------------------------' + \"\\n\");","          });","        });","        ","            var timeElapsedDays = 365;","            var buyPrice = [];","            var sellPrice = [];","            var buyPriceMultbyQty = [];","            var sellPriceMultbyQty = [];","            var buyQty = [];","            var sellQty = [];","","            for (var i = 0; i < trades.length; i++){","              ","              if (trades[i].isBuyer === true && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                buyPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                buyPrice.push(Number(trades[i].price));","                buyQty.push(Number(trades[i].qty));","                ","              } else if (trades[i].isBuyer === false && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                sellPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                sellPrice.push(Number(trades[i].price));","                sellQty.push(Number(trades[i].qty));","              }","            }","            ","          var weightedBuyPrice = (math.sum(buyPriceMultbyQty)/math.sum(buyQty)).toFixed(6);","          var weightedSellPrice = (math.sum(sellPriceMultbyQty)/math.sum(sellQty)).toFixed(6);","            ","          console.log(colors.underline(`${symbol} Trade History Last 500 trades => `) + \"\\n\"","          + `Count Buy Trades: ${buyPrice.length} \\n`","          + `Count Sell Trades: ${sellPrice.length} \\n`","          + `Total Qty Bought: ${math.sum(buyQty).toFixed(0)} \\n`","          + `Total Qty Sold: ${math.sum(sellQty).toFixed(0)} \\n`","          + `Weighted Buy Price: ${weightedBuyPrice} \\n`","          + `Weighted Sell Price: ${weightedSellPrice} \\n`","          + 'Total Profit/Loss: ' + ((weightedSellPrice - weightedBuyPrice) * Math.min(Number(math.sum(sellQty)), Number(math.sum(buyQty))) ).toFixed(4) + ' ETH');","          ","          var mktMakerProfitOrLoss = Number((((((weightedSellPrice)/weightedBuyPrice) - 1) * 100) - 0.2).toFixed(2));","          ","          if(mktMakerProfitOrLoss > 0 ) {","            console.log(\"Avg MKT_Maker Spread: \" + colors.green(mktMakerProfitOrLoss + ' %').bold);","            } else { ","              console.log(\"Avg MKT_Maker Spread: \" + colors.red(mktMakerProfitOrLoss + ' %').bold);","            }  ","          console.log('------------------------------------------------------------'  + \"\\n\");","        });","        ","      binance.trades(\"EOSETH\", (error, trades, symbol) => {","        ","            var timeElapsedDays = 1;","            var buyPrice = [];","            var sellPrice = [];","            var buyPriceMultbyQty = [];","            var sellPriceMultbyQty = [];","            var buyQty = [];","            var sellQty = [];","","            for (var i = 0; i < trades.length; i++){","              ","              if (trades[i].isBuyer === true && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                buyPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                buyPrice.push(Number(trades[i].price));","                buyQty.push(Number(trades[i].qty));","                ","              } else if (trades[i].isBuyer === false && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                sellPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                sellPrice.push(Number(trades[i].price));","                sellQty.push(Number(trades[i].qty));","              }","            }","            ","          var weightedBuyPrice = (math.sum(buyPriceMultbyQty)/math.sum(buyQty)).toFixed(6);","          var weightedSellPrice = (math.sum(sellPriceMultbyQty)/math.sum(sellQty)).toFixed(6);","            ","          console.log(colors.underline(`${symbol} Trade History Last 24 hrs => `) + \"\\n\"","          + `Count Buy Trades: ${buyPrice.length} \\n`","          + `Count Sell Trades: ${sellPrice.length} \\n`","          + `Total Qty Bought: ${math.sum(buyQty).toFixed(0)} \\n`","          + `Total Qty Sold: ${math.sum(sellQty).toFixed(0)} \\n`","          + `Weighted Buy Price: ${weightedBuyPrice} \\n`","          + `Weighted Sell Price: ${weightedSellPrice} \\n`","          + 'Total Profit/Loss: ' + ((weightedSellPrice - weightedBuyPrice) * Math.min(Number(math.sum(sellQty)), Number(math.sum(buyQty))) ).toFixed(4) + ' ETH');","          ","          var mktMakerProfitOrLoss = Number((((((weightedSellPrice)/weightedBuyPrice) - 1) * 100) - 0.2).toFixed(2));","          ","          if(mktMakerProfitOrLoss > 0 ) {","            console.log(\"Avg MKT_Maker Spread: \" + colors.green(mktMakerProfitOrLoss + ' %').bold);","              } else { ","              console.log(\"Avg MKT_Maker Spread: \" + colors.red(mktMakerProfitOrLoss + ' %').bold);","            }  ","          console.log('------------------------------------------------------------'  + \"\\n\");","        });","             ","  }, {limit: 20, endTime: Date.now()});","}, 8000);"],"id":7}],[{"start":{"row":50,"column":0},"end":{"row":51,"column":0},"action":"insert","lines":["",""],"id":8},{"start":{"row":51,"column":0},"end":{"row":52,"column":0},"action":"insert","lines":["",""]},{"start":{"row":52,"column":0},"end":{"row":53,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":52,"column":0},"end":{"row":257,"column":9},"action":"insert","lines":["setInterval(function(){","  //GET Chart Data","  binance.candlesticks(\"BATETH\", \"3m\", (error, ticks, symbol) => {","    // console.log(\"candlesticks()\", ticks, ticks[19][4]);","    let last_tick = ticks[ticks.length - 1];","    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;","    ","      //Compare Technical Indicators","      ","      var array20Period = new Array(); ","      ","      for (var i = 0; i < 20; i++) {","        array20Period.push(Number(ticks[i][4]));","      }","      ","      var sigmaBuy = 2.05;","      var sigmaSell = 2;","      var avg20Period = +math.mean(array20Period).toFixed(6);","      var std20Period = +math.std(array20Period);","      var upperLimit = +(avg20Period + (std20Period * sigmaSell)).toFixed(6);","      var lowerLimit = +(avg20Period - (std20Period * sigmaBuy)).toFixed(6);","","        if(Number(ticks[19][4]).toFixed(6) <= lowerLimit) {","        ","        // Execute Trade Based on Technical Indicator Condition. ","        setTimeout(function(){  ","          ","          binance.cancelOrders(\"BATETH\", (error, response, symbol) => {","            console.log(symbol+\" cancel response:\", response);","          });","          ","          var quantityBuy = 11;","          binance.buy(\"BATETH\", quantityBuy, Number(ticks[19][4]).toFixed(7));","          ","        },1000);","          ","        } else if (Number(ticks[19][4]).toFixed(6) >= upperLimit) {","          ","        setTimeout(function(){    ","          ","          binance.cancelOrders(\"BATETH\", (error, response, symbol) => {","            console.log(symbol+\" cancel response:\", response);","          });","          ","          var quantitySell = 11;","          binance.sell(\"BATETH\", quantitySell, Number(ticks[19][4]).toFixed(7));","          ","        },1000);  ","          ","        } else {","          ","          ","    console.log('============================================================');      ","    console.log(new Date().toLocaleString()); console.log(colors.cyan('Waiting for trade... => ' + symbol).bold)}","    console.log('------------------------------------------------------------');","      if( +close > +avg20Period) {console.log('^^^^^^^^^^^^^^^^^^^^^^^^ Trend is UP ^^^^^^^^^^^^^^^^^^^^^^^^'.bgGreen + \"\\n\")} ","      else {console.log('________________________ Trend is DOWN ________________________'.bgRed + \"\\n\")} ","    console.log(colors.underline(`Price Data =>`));","    console.log(\"Last Close: \" + Number(close).toFixed(6));","    console.log(\"Avg 20 Period: \" + avg20Period);","    console.log(\"Upper Limit @Sigma Lvl. \" + sigmaSell + \" = \" + upperLimit);","    console.log(\"Lower Limit @Sigma Lvl. \" + sigmaBuy + \" = \" + lowerLimit);","    console.log('------------------------------------------------------------' + \"\\n\");","  ","    ","      binance.trades(\"BATETH\", (error, trades, symbol) => {","        ","        binance.prices((error, ticker) => {","          binance.balance((error, balances) => {","            if ( error ) return console.error(error);","            console.log(colors.underline(`Account Data =>`));","            ","            // Started Testing Bot with 3.77 Eth on 11/09/2018, 2.14 12/07/2018, 6.19 12/14/2018","            var totalETHInvested = 11.98;","            var batEthBalance = (Number(balances.BAT.available) * Number(ticker.BATETH)).toFixed(2);","            var eosEthBalance = (Number(balances.EOS.available) * Number(ticker.EOSETH)).toFixed(2);","            var ethBalance = (Number(balances.ETH.available)).toFixed(2);","            var totalBalance = +batEthBalance + +eosEthBalance + +ethBalance;","            ","            console.log(`BAT balance: ${(+balances.BAT.available).toFixed(0)} or ${batEthBalance} ETH, ${((+batEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);","            console.log(`eos balance: ${(+balances.EOS.available).toFixed(0)} or ${eosEthBalance} ETH, ${((+eosEthBalance/+totalBalance)*100).toFixed(0)} % On Trade`);","            console.log(\"ETH balance:\", ethBalance);","            console.log(\"Total ETH balance:\", totalBalance.toFixed(2));","            console.log('Total ETH Invested:', totalETHInvested);","            console.log('Total ETH Profit Or Loss:', (totalBalance - totalETHInvested).toFixed(2));","            var roi = (((+totalBalance/+totalETHInvested)-1)*100).toFixed(2);","          ","              if( roi > 0 ) {","                console.log(colors.bgBlack(`ROI Since Inception ( ${moment(\"20181109\", \"YYYYMMDD\").fromNow()} ): ` + colors.green(roi  + ' %')).bold);","              } else {","                console.log(colors.bgBlack(`ROI Since Inception ( ${moment(\"20181109\", \"YYYYMMDD\").fromNow()} ): ` + colors.red(roi  + ' %')).bold);","              }","            console.log('------------------------------------------------------------' + \"\\n\");","            ","            //Log Balance History ","            var data = fs.readFileSync('./data/balanceHistory.json');","            var parsedData = JSON.parse(data);","","            var balanceHistory = parsedData;","            ","            if(parsedData[parsedData.length -1].date != moment().format('MM/DD/YYYY')){","                      balanceHistory.push({date: moment().format('MM/DD/YYYY'),","                      totalETHInvested: totalETHInvested,","                      totalBalance: +(+batEthBalance + +eosEthBalance + +ethBalance).toFixed(2),","                      totalProfitLoss: +(+batEthBalance + +eosEthBalance + +ethBalance).toFixed(2) - +totalETHInvested,","                      roi: roi}","                  );","                fs.writeFileSync('./data/balanceHistory.json', JSON.stringify(balanceHistory,null, \" \")","              );","            }","            ","          });","        });","        ","            var timeElapsedDays = 365;","            var buyPrice = [];","            var sellPrice = [];","            var buyPriceMultbyQty = [];","            var sellPriceMultbyQty = [];","            var buyQty = [];","            var sellQty = [];","","            for (var i = 0; i < trades.length; i++){","              ","              if (trades[i].isBuyer === true && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                buyPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                buyPrice.push(Number(trades[i].price));","                buyQty.push(Number(trades[i].qty));","                ","              } else if (trades[i].isBuyer === false && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                sellPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                sellPrice.push(Number(trades[i].price));","                sellQty.push(Number(trades[i].qty));","              }","            }","            ","          var weightedBuyPrice = (math.sum(buyPriceMultbyQty)/math.sum(buyQty)).toFixed(6);","          var weightedSellPrice = (math.sum(sellPriceMultbyQty)/math.sum(sellQty)).toFixed(6);","            ","          console.log(colors.underline(`${symbol} Trade History Last 500 trades => `) + \"\\n\"","          + `Count Buy Trades: ${buyPrice.length} \\n`","          + `Count Sell Trades: ${sellPrice.length} \\n`","          + `Total Qty Bought: ${math.sum(buyQty)} \\n`","          + `Total Qty Sold: ${math.sum(sellQty)} \\n`","          + `Weighted Buy Price: ${weightedBuyPrice} \\n`","          + `Weighted Sell Price: ${weightedSellPrice} \\n`","          + 'Total Profit/Loss: ' + ((weightedSellPrice - weightedBuyPrice) * Math.min(Number(math.sum(sellQty)), Number(math.sum(buyQty))) ).toFixed(4) + ' ETH');","          ","          var mktMakerProfitOrLoss = Number((((((weightedSellPrice)/weightedBuyPrice) - 1) * 100) - 0.2).toFixed(2));","          ","          if(mktMakerProfitOrLoss > 0 ) {","            console.log(\"Avg MKT_Maker Spread: \" + colors.green(mktMakerProfitOrLoss + ' %').bold);","            } else { ","              console.log(\"Avg MKT_Maker Spread: \" + colors.red(mktMakerProfitOrLoss + ' %').bold);","            }  ","          console.log('------------------------------------------------------------'  + \"\\n\");","        });","        ","      binance.trades(\"BATETH\", (error, trades, symbol) => {","        ","            var timeElapsedDays = 1;","            var buyPrice = [];","            var sellPrice = [];","            var buyPriceMultbyQty = [];","            var sellPriceMultbyQty = [];","            var buyQty = [];","            var sellQty = [];","","            for (var i = 0; i < trades.length; i++){","              ","              if (trades[i].isBuyer === true && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                buyPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                buyPrice.push(Number(trades[i].price));","                buyQty.push(Number(trades[i].qty));","                ","              } else if (trades[i].isBuyer === false && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                sellPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                sellPrice.push(Number(trades[i].price));","                sellQty.push(Number(trades[i].qty));","              }","            }","            ","          var weightedBuyPrice = (math.sum(buyPriceMultbyQty)/math.sum(buyQty)).toFixed(6);","          var weightedSellPrice = (math.sum(sellPriceMultbyQty)/math.sum(sellQty)).toFixed(6);","            ","          console.log(colors.underline(`${symbol} Trade History Last 24 hrs => `) + \"\\n\"","          + `Count Buy Trades: ${buyPrice.length} \\n`","          + `Count Sell Trades: ${sellPrice.length} \\n`","          + `Total Qty Bought: ${math.sum(buyQty)} \\n`","          + `Total Qty Sold: ${math.sum(sellQty)} \\n`","          + `Weighted Buy Price: ${weightedBuyPrice} \\n`","          + `Weighted Sell Price: ${weightedSellPrice} \\n`","          + 'Total Profit/Loss: ' + ((weightedSellPrice - weightedBuyPrice) * Math.min(Number(math.sum(sellQty)), Number(math.sum(buyQty))) ).toFixed(4) + ' ETH');","          ","          var mktMakerProfitOrLoss = Number((((((weightedSellPrice)/weightedBuyPrice) - 1) * 100) - 0.2).toFixed(2));","          ","          if(mktMakerProfitOrLoss > 0 ) {","            console.log(\"Avg MKT_Maker Spread: \" + colors.green(mktMakerProfitOrLoss + ' %').bold);","              } else { ","              console.log(\"Avg MKT_Maker Spread: \" + colors.red(mktMakerProfitOrLoss + ' %').bold);","            }  ","          console.log('------------------------------------------------------------'  + \"\\n\");","        });","             ","  }, {limit: 20, endTime: Date.now()});","}, 8000);"],"id":9}],[{"start":{"row":257,"column":3},"end":{"row":257,"column":4},"action":"remove","lines":["8"],"id":10}],[{"start":{"row":257,"column":3},"end":{"row":257,"column":4},"action":"insert","lines":["6"],"id":11},{"start":{"row":257,"column":4},"end":{"row":257,"column":5},"action":"insert","lines":["0"]}]]},"ace":{"folds":[],"scrolltop":2250,"scrollleft":0,"selection":{"start":{"row":53,"column":3},"end":{"row":53,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":193,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1544916649982,"hash":"13b5368366df04eaa510df241e1a72b335daa9a1"}