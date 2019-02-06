{"filter":false,"title":"appbot1.js","tooltip":"/appbot1.js","undoManager":{"mark":39,"position":39,"stack":[[{"start":{"row":239,"column":0},"end":{"row":240,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":240,"column":0},"end":{"row":241,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":240,"column":0},"end":{"row":425,"column":9},"action":"insert","lines":["/////////////////////////////////////////////////////// BAT/ETH TRADING BOT ///////////////////////////////////////////////////////","","setInterval(function(){","  //GET Chart Data","  binance.candlesticks(\"BATETH\", \"3m\", (error, ticks, symbol) => {","    // console.log(\"candlesticks()\", ticks, ticks[19][4]);","    let last_tick = ticks[ticks.length - 1];","    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;","    ","      //Compare Technical Indicators","      ","      var array20Period = new Array(); ","      ","      for (var i = 0; i < 20; i++) {","        array20Period.push(Number(ticks[i][4]));","      }","      ","      var sigmaBuy = 2.1;","      var sigmaSell = 2;","      var avg20Period = +math.mean(array20Period).toFixed(6);","      var std20Period = +math.std(array20Period);","      var upperLimit = +(avg20Period + (std20Period * sigmaSell)).toFixed(6);","      var lowerLimit = +(avg20Period - (std20Period * sigmaBuy)).toFixed(6);","","        if(Number(ticks[19][4]).toFixed(6) <= lowerLimit) {","        ","        // Execute Trade Based on Technical Indicator Condition. ","        setTimeout(function(){  ","          ","          binance.cancelOrders(\"BATETH\", (error, response, symbol) => {","            console.log(symbol+\" cancel response:\", response);","          });","          ","          var quantityBuy = 10;","          binance.buy(\"BATETH\", quantityBuy, Number(ticks[19][4]).toFixed(7));","          ","        },1000);","          ","        } else if (Number(ticks[19][4]).toFixed(6) >= upperLimit) {","          ","        setTimeout(function(){    ","          ","          binance.cancelOrders(\"BATETH\", (error, response, symbol) => {","            console.log(symbol+\" cancel response:\", response);","          });","          ","          var quantitySell = 10;","          binance.sell(\"BATETH\", quantitySell, Number(ticks[19][4]).toFixed(7));","          ","        },1000);  ","          ","        } else {","          ","    console.log('============================================================');      ","    console.log(new Date().toLocaleString()); console.log('Waiting for trade... => ' + symbol)}","    console.log('------------------------------------------------------------');","      if( +close > +avg20Period) {console.log('^^^^^^^^^^^^^^^^^^^^^^^^ Trend is UP ^^^^^^^^^^^^^^^^^^^^^^^^'.bgGreen + \"\\n\")} ","      else {console.log('________________________ Trend is DOWN ________________________'.bgRed + \"\\n\")} ","    console.log(colors.underline(`Price Data =>`));","    console.log(\"Last Close: \" + Number(close).toFixed(6));","    console.log(\"Avg 20 Period: \" + avg20Period);","    console.log(\"Upper Limit @Sigma Lvl. \" + sigmaSell + \" = \" + upperLimit);","    console.log(\"Lower Limit @Sigma Lvl. \" + sigmaBuy + \" = \" + lowerLimit);","    console.log('------------------------------------------------------------' + \"\\n\");","    ","      binance.trades(\"BATETH\", (error, trades, symbol) => {","        ","        binance.balance((error, balances) => {","          if ( error ) return console.error(error);","          ","          var totalBalance = ((Number(balances.BAT.available)*Number(close)) + Number(balances.ETH.available)).toFixed(2);","          ","          console.log(colors.underline(`Account Data =>`));","          console.log(\"BAT Balance: \" + Number(balances.BAT.available).toFixed(2));","          console.log(\"ETH Balance: \" + Number(balances.ETH.available).toFixed(2));","          ","          // Started Testing Bot with 3.77 Eth on 11/09/2018","          var totalETHInvested = 3.77;","          ","          console.log('Total ETH Invested: 3.77');","          console.log(\"Total ETH Balance: \" + totalBalance);","          console.log('Percentage Of Capital On Trade: ' + ((1 - (Number(balances.ETH.available)/Number(totalBalance))) * 100).toFixed(2) + ' %' );","          console.log('Total Profit Or Loss: ' + (totalBalance - totalETHInvested).toFixed(2) + ' ETH');","          ","          var roi = Number(((((((Number(balances.BAT.available)*Number(close)) + Number(balances.ETH.available)))/ totalETHInvested ) -1) * 100).toFixed(2));","          ","          if( roi > 0 ) {","            console.log(colors.bgBlack(`ROI Since Inception ( ${moment(\"20181109\", \"YYYYMMDD\").fromNow()} ): ` + colors.green(roi  + ' %')).bold);","          } else {","            console.log(colors.bgBlack(`ROI Since Inception ( ${moment(\"20181109\", \"YYYYMMDD\").fromNow()} ): ` + colors.red(roi  + ' %')).bold);","          }","          console.log('------------------------------------------------------------' + \"\\n\");","        });","        ","            var timeElapsedDays = 365;","            var buyPrice = [];","            var sellPrice = [];","            var buyPriceMultbyQty = [];","            var sellPriceMultbyQty = [];","            var buyQty = [];","            var sellQty = [];","","            for (var i = 0; i < trades.length; i++){","              ","              if (trades[i].isBuyer === true && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                buyPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                buyPrice.push(Number(trades[i].price));","                buyQty.push(Number(trades[i].qty));","                ","              } else if (trades[i].isBuyer === false && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                sellPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                sellPrice.push(Number(trades[i].price));","                sellQty.push(Number(trades[i].qty));","              }","            }","            ","          var weightedBuyPrice = (math.sum(buyPriceMultbyQty)/math.sum(buyQty)).toFixed(6);","          var weightedSellPrice = (math.sum(sellPriceMultbyQty)/math.sum(sellQty)).toFixed(6);","            ","          console.log(colors.underline(`${symbol} Trade History Last 500 trades => `) + \"\\n\"","          + `Count Buy Trades: ${buyPrice.length} \\n`","          + `Count Sell Trades: ${sellPrice.length} \\n`","          + `Total Qty Bought: ${math.sum(buyQty)} \\n`","          + `Total Qty Sold: ${math.sum(sellQty)} \\n`","          + `Weighted Buy Price: ${weightedBuyPrice} \\n`","          + `Weighted Sell Price: ${weightedSellPrice} \\n`","          + 'Total Profit/Loss: ' + ((weightedSellPrice - weightedBuyPrice) * Math.min(Number(math.sum(sellQty)), Number(math.sum(buyQty))) ).toFixed(4) + ' ETH');","          ","          var mktMakerProfitOrLoss = Number((((((weightedSellPrice)/weightedBuyPrice) - 1) * 100) - 0.2).toFixed(2));","          ","          if(mktMakerProfitOrLoss > 0 ) {","            console.log(\"Avg MKT_Maker Spread: \" + colors.green(mktMakerProfitOrLoss + ' %').bold);","            } else { ","              console.log(\"Avg MKT_Maker Spread: \" + colors.red(mktMakerProfitOrLoss + ' %').bold);","            }  ","          console.log('------------------------------------------------------------'  + \"\\n\");","        });","        ","      binance.trades(\"BATETH\", (error, trades, symbol) => {","        ","            var timeElapsedDays = 1;","            var buyPrice = [];","            var sellPrice = [];","            var buyPriceMultbyQty = [];","            var sellPriceMultbyQty = [];","            var buyQty = [];","            var sellQty = [];","","            for (var i = 0; i < trades.length; i++){","              ","              if (trades[i].isBuyer === true && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                buyPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                buyPrice.push(Number(trades[i].price));","                buyQty.push(Number(trades[i].qty));","                ","              } else if (trades[i].isBuyer === false && trades[i].time >= moment().subtract(timeElapsedDays, 'days').unix() * 1000) {","                sellPriceMultbyQty.push(Number(trades[i].price) * Number(trades[i].qty));","                sellPrice.push(Number(trades[i].price));","                sellQty.push(Number(trades[i].qty));","              }","            }","            ","          var weightedBuyPrice = (math.sum(buyPriceMultbyQty)/math.sum(buyQty)).toFixed(6);","          var weightedSellPrice = (math.sum(sellPriceMultbyQty)/math.sum(sellQty)).toFixed(6);","            ","          console.log(colors.underline(`${symbol} Trade History Last 24 hrs => `) + \"\\n\"","          + `Count Buy Trades: ${buyPrice.length} \\n`","          + `Count Sell Trades: ${sellPrice.length} \\n`","          + `Total Qty Bought: ${math.sum(buyQty)} \\n`","          + `Total Qty Sold: ${math.sum(sellQty)} \\n`","          + `Weighted Buy Price: ${weightedBuyPrice} \\n`","          + `Weighted Sell Price: ${weightedSellPrice} \\n`","          + 'Total Profit/Loss: ' + ((weightedSellPrice - weightedBuyPrice) * Math.min(Number(math.sum(sellQty)), Number(math.sum(buyQty))) ).toFixed(4) + ' ETH');","          ","          var mktMakerProfitOrLoss = Number((((((weightedSellPrice)/weightedBuyPrice) - 1) * 100) - 0.2).toFixed(2));","          ","          if(mktMakerProfitOrLoss > 0 ) {","            console.log(\"Avg MKT_Maker Spread: \" + colors.green(mktMakerProfitOrLoss + ' %').bold);","              } else { ","              console.log(\"Avg MKT_Maker Spread: \" + colors.red(mktMakerProfitOrLoss + ' %').bold);","            }  ","          console.log('------------------------------------------------------------'  + \"\\n\");","        });","             ","  }, {limit: 20, endTime: Date.now()});","}, 8000);"],"id":3}],[{"start":{"row":425,"column":9},"end":{"row":426,"column":0},"action":"insert","lines":["",""],"id":4}],[{"start":{"row":240,"column":56},"end":{"row":240,"column":59},"action":"remove","lines":["BAT"],"id":5},{"start":{"row":240,"column":56},"end":{"row":240,"column":59},"action":"insert","lines":["EOS"]}],[{"start":{"row":244,"column":24},"end":{"row":244,"column":27},"action":"remove","lines":["BAT"],"id":6},{"start":{"row":244,"column":24},"end":{"row":244,"column":27},"action":"insert","lines":["EOS"]}],[{"start":{"row":269,"column":32},"end":{"row":269,"column":35},"action":"remove","lines":["BAT"],"id":7},{"start":{"row":269,"column":32},"end":{"row":269,"column":35},"action":"insert","lines":["EOS"]}],[{"start":{"row":274,"column":23},"end":{"row":274,"column":26},"action":"remove","lines":["BAT"],"id":8},{"start":{"row":274,"column":23},"end":{"row":274,"column":26},"action":"insert","lines":["EOS"]}],[{"start":{"row":282,"column":32},"end":{"row":282,"column":35},"action":"remove","lines":["BAT"],"id":9},{"start":{"row":282,"column":32},"end":{"row":282,"column":35},"action":"insert","lines":["EOS"]}],[{"start":{"row":287,"column":24},"end":{"row":287,"column":27},"action":"remove","lines":["BAT"],"id":10},{"start":{"row":287,"column":24},"end":{"row":287,"column":27},"action":"insert","lines":["EOS"]}],[{"start":{"row":305,"column":22},"end":{"row":305,"column":25},"action":"remove","lines":["BAT"],"id":11},{"start":{"row":305,"column":22},"end":{"row":305,"column":25},"action":"insert","lines":["EOS"]}],[{"start":{"row":310,"column":47},"end":{"row":310,"column":50},"action":"remove","lines":["BAT"],"id":12},{"start":{"row":310,"column":47},"end":{"row":310,"column":50},"action":"insert","lines":["EOS"]}],[{"start":{"row":313,"column":23},"end":{"row":313,"column":26},"action":"remove","lines":["BAT"],"id":13},{"start":{"row":313,"column":23},"end":{"row":313,"column":26},"action":"insert","lines":["EOS"]}],[{"start":{"row":313,"column":56},"end":{"row":313,"column":59},"action":"remove","lines":["BAT"],"id":14},{"start":{"row":313,"column":56},"end":{"row":313,"column":59},"action":"insert","lines":["EOS"]}],[{"start":{"row":324,"column":49},"end":{"row":324,"column":52},"action":"remove","lines":["BAT"],"id":15},{"start":{"row":324,"column":49},"end":{"row":324,"column":52},"action":"insert","lines":["EOS"]}],[{"start":{"row":378,"column":22},"end":{"row":378,"column":25},"action":"remove","lines":["BAT"],"id":16},{"start":{"row":378,"column":22},"end":{"row":378,"column":25},"action":"insert","lines":["EOS"]}],[{"start":{"row":425,"column":3},"end":{"row":425,"column":4},"action":"remove","lines":["8"],"id":17}],[{"start":{"row":425,"column":3},"end":{"row":425,"column":4},"action":"insert","lines":["7"],"id":18}],[{"start":{"row":425,"column":4},"end":{"row":425,"column":5},"action":"remove","lines":["0"],"id":19}],[{"start":{"row":425,"column":4},"end":{"row":425,"column":5},"action":"insert","lines":["5"],"id":20}],[{"start":{"row":425,"column":4},"end":{"row":425,"column":5},"action":"remove","lines":["5"],"id":21}],[{"start":{"row":425,"column":4},"end":{"row":425,"column":5},"action":"insert","lines":["0"],"id":22}],[{"start":{"row":425,"column":4},"end":{"row":425,"column":5},"action":"remove","lines":["0"],"id":23},{"start":{"row":425,"column":3},"end":{"row":425,"column":4},"action":"remove","lines":["7"]}],[{"start":{"row":425,"column":3},"end":{"row":425,"column":4},"action":"insert","lines":["9"],"id":24},{"start":{"row":425,"column":4},"end":{"row":425,"column":5},"action":"insert","lines":["0"]}],[{"start":{"row":273,"column":28},"end":{"row":273,"column":29},"action":"remove","lines":["1"],"id":25}],[{"start":{"row":273,"column":29},"end":{"row":273,"column":30},"action":"insert","lines":["."],"id":26},{"start":{"row":273,"column":30},"end":{"row":273,"column":31},"action":"insert","lines":["5"]}],[{"start":{"row":286,"column":30},"end":{"row":286,"column":31},"action":"remove","lines":["0"],"id":27},{"start":{"row":286,"column":29},"end":{"row":286,"column":30},"action":"remove","lines":["1"]}],[{"start":{"row":286,"column":29},"end":{"row":286,"column":30},"action":"insert","lines":["0"],"id":28},{"start":{"row":286,"column":30},"end":{"row":286,"column":31},"action":"insert","lines":["."]},{"start":{"row":286,"column":31},"end":{"row":286,"column":32},"action":"insert","lines":["5"]}],[{"start":{"row":287,"column":76},"end":{"row":287,"column":77},"action":"remove","lines":["7"],"id":29}],[{"start":{"row":287,"column":76},"end":{"row":287,"column":77},"action":"insert","lines":["7"],"id":30}],[{"start":{"row":287,"column":76},"end":{"row":287,"column":77},"action":"remove","lines":["7"],"id":31}],[{"start":{"row":287,"column":76},"end":{"row":287,"column":77},"action":"insert","lines":["6"],"id":32}],[{"start":{"row":274,"column":74},"end":{"row":274,"column":75},"action":"remove","lines":["7"],"id":33}],[{"start":{"row":274,"column":74},"end":{"row":274,"column":75},"action":"insert","lines":["6"],"id":34}],[{"start":{"row":240,"column":0},"end":{"row":240,"column":3},"action":"insert","lines":["// "],"id":35},{"start":{"row":242,"column":0},"end":{"row":242,"column":3},"action":"insert","lines":["// "]},{"start":{"row":243,"column":0},"end":{"row":243,"column":3},"action":"insert","lines":["// "]},{"start":{"row":244,"column":0},"end":{"row":244,"column":3},"action":"insert","lines":["// "]},{"start":{"row":245,"column":0},"end":{"row":245,"column":3},"action":"insert","lines":["// "]},{"start":{"row":246,"column":0},"end":{"row":246,"column":3},"action":"insert","lines":["// "]},{"start":{"row":247,"column":0},"end":{"row":247,"column":3},"action":"insert","lines":["// "]},{"start":{"row":249,"column":0},"end":{"row":249,"column":3},"action":"insert","lines":["// "]},{"start":{"row":251,"column":0},"end":{"row":251,"column":3},"action":"insert","lines":["// "]},{"start":{"row":253,"column":0},"end":{"row":253,"column":3},"action":"insert","lines":["// "]},{"start":{"row":254,"column":0},"end":{"row":254,"column":3},"action":"insert","lines":["// "]},{"start":{"row":255,"column":0},"end":{"row":255,"column":3},"action":"insert","lines":["// "]},{"start":{"row":257,"column":0},"end":{"row":257,"column":3},"action":"insert","lines":["// "]},{"start":{"row":258,"column":0},"end":{"row":258,"column":3},"action":"insert","lines":["// "]},{"start":{"row":259,"column":0},"end":{"row":259,"column":3},"action":"insert","lines":["// "]},{"start":{"row":260,"column":0},"end":{"row":260,"column":3},"action":"insert","lines":["// "]},{"start":{"row":261,"column":0},"end":{"row":261,"column":3},"action":"insert","lines":["// "]},{"start":{"row":262,"column":0},"end":{"row":262,"column":3},"action":"insert","lines":["// "]},{"start":{"row":264,"column":0},"end":{"row":264,"column":3},"action":"insert","lines":["// "]},{"start":{"row":266,"column":0},"end":{"row":266,"column":3},"action":"insert","lines":["// "]},{"start":{"row":267,"column":0},"end":{"row":267,"column":3},"action":"insert","lines":["// "]},{"start":{"row":269,"column":0},"end":{"row":269,"column":3},"action":"insert","lines":["// "]},{"start":{"row":270,"column":0},"end":{"row":270,"column":3},"action":"insert","lines":["// "]},{"start":{"row":271,"column":0},"end":{"row":271,"column":3},"action":"insert","lines":["// "]},{"start":{"row":273,"column":0},"end":{"row":273,"column":3},"action":"insert","lines":["// "]},{"start":{"row":274,"column":0},"end":{"row":274,"column":3},"action":"insert","lines":["// "]},{"start":{"row":276,"column":0},"end":{"row":276,"column":3},"action":"insert","lines":["// "]},{"start":{"row":278,"column":0},"end":{"row":278,"column":3},"action":"insert","lines":["// "]},{"start":{"row":280,"column":0},"end":{"row":280,"column":3},"action":"insert","lines":["// "]},{"start":{"row":282,"column":0},"end":{"row":282,"column":3},"action":"insert","lines":["// "]},{"start":{"row":283,"column":0},"end":{"row":283,"column":3},"action":"insert","lines":["// "]},{"start":{"row":284,"column":0},"end":{"row":284,"column":3},"action":"insert","lines":["// "]},{"start":{"row":286,"column":0},"end":{"row":286,"column":3},"action":"insert","lines":["// "]},{"start":{"row":287,"column":0},"end":{"row":287,"column":3},"action":"insert","lines":["// "]},{"start":{"row":289,"column":0},"end":{"row":289,"column":3},"action":"insert","lines":["// "]},{"start":{"row":291,"column":0},"end":{"row":291,"column":3},"action":"insert","lines":["// "]},{"start":{"row":293,"column":0},"end":{"row":293,"column":3},"action":"insert","lines":["// "]},{"start":{"row":294,"column":0},"end":{"row":294,"column":3},"action":"insert","lines":["// "]},{"start":{"row":295,"column":0},"end":{"row":295,"column":3},"action":"insert","lines":["// "]},{"start":{"row":296,"column":0},"end":{"row":296,"column":3},"action":"insert","lines":["// "]},{"start":{"row":297,"column":0},"end":{"row":297,"column":3},"action":"insert","lines":["// "]},{"start":{"row":298,"column":0},"end":{"row":298,"column":3},"action":"insert","lines":["// "]},{"start":{"row":299,"column":0},"end":{"row":299,"column":3},"action":"insert","lines":["// "]},{"start":{"row":300,"column":0},"end":{"row":300,"column":3},"action":"insert","lines":["// "]},{"start":{"row":301,"column":0},"end":{"row":301,"column":3},"action":"insert","lines":["// "]},{"start":{"row":302,"column":0},"end":{"row":302,"column":3},"action":"insert","lines":["// "]},{"start":{"row":303,"column":0},"end":{"row":303,"column":3},"action":"insert","lines":["// "]},{"start":{"row":305,"column":0},"end":{"row":305,"column":3},"action":"insert","lines":["// "]},{"start":{"row":307,"column":0},"end":{"row":307,"column":3},"action":"insert","lines":["// "]},{"start":{"row":308,"column":0},"end":{"row":308,"column":3},"action":"insert","lines":["// "]},{"start":{"row":310,"column":0},"end":{"row":310,"column":3},"action":"insert","lines":["// "]},{"start":{"row":312,"column":0},"end":{"row":312,"column":3},"action":"insert","lines":["// "]},{"start":{"row":313,"column":0},"end":{"row":313,"column":3},"action":"insert","lines":["// "]},{"start":{"row":314,"column":0},"end":{"row":314,"column":3},"action":"insert","lines":["// "]},{"start":{"row":316,"column":0},"end":{"row":316,"column":3},"action":"insert","lines":["// "]},{"start":{"row":317,"column":0},"end":{"row":317,"column":3},"action":"insert","lines":["// "]},{"start":{"row":319,"column":0},"end":{"row":319,"column":3},"action":"insert","lines":["// "]},{"start":{"row":320,"column":0},"end":{"row":320,"column":3},"action":"insert","lines":["// "]},{"start":{"row":321,"column":0},"end":{"row":321,"column":3},"action":"insert","lines":["// "]},{"start":{"row":322,"column":0},"end":{"row":322,"column":3},"action":"insert","lines":["// "]},{"start":{"row":324,"column":0},"end":{"row":324,"column":3},"action":"insert","lines":["// "]},{"start":{"row":326,"column":0},"end":{"row":326,"column":3},"action":"insert","lines":["// "]},{"start":{"row":327,"column":0},"end":{"row":327,"column":3},"action":"insert","lines":["// "]},{"start":{"row":328,"column":0},"end":{"row":328,"column":3},"action":"insert","lines":["// "]},{"start":{"row":329,"column":0},"end":{"row":329,"column":3},"action":"insert","lines":["// "]},{"start":{"row":330,"column":0},"end":{"row":330,"column":3},"action":"insert","lines":["// "]},{"start":{"row":331,"column":0},"end":{"row":331,"column":3},"action":"insert","lines":["// "]},{"start":{"row":332,"column":0},"end":{"row":332,"column":3},"action":"insert","lines":["// "]},{"start":{"row":334,"column":0},"end":{"row":334,"column":3},"action":"insert","lines":["// "]},{"start":{"row":335,"column":0},"end":{"row":335,"column":3},"action":"insert","lines":["// "]},{"start":{"row":336,"column":0},"end":{"row":336,"column":3},"action":"insert","lines":["// "]},{"start":{"row":337,"column":0},"end":{"row":337,"column":3},"action":"insert","lines":["// "]},{"start":{"row":338,"column":0},"end":{"row":338,"column":3},"action":"insert","lines":["// "]},{"start":{"row":339,"column":0},"end":{"row":339,"column":3},"action":"insert","lines":["// "]},{"start":{"row":340,"column":0},"end":{"row":340,"column":3},"action":"insert","lines":["// "]},{"start":{"row":342,"column":0},"end":{"row":342,"column":3},"action":"insert","lines":["// "]},{"start":{"row":344,"column":0},"end":{"row":344,"column":3},"action":"insert","lines":["// "]},{"start":{"row":345,"column":0},"end":{"row":345,"column":3},"action":"insert","lines":["// "]},{"start":{"row":346,"column":0},"end":{"row":346,"column":3},"action":"insert","lines":["// "]},{"start":{"row":347,"column":0},"end":{"row":347,"column":3},"action":"insert","lines":["// "]},{"start":{"row":349,"column":0},"end":{"row":349,"column":3},"action":"insert","lines":["// "]},{"start":{"row":350,"column":0},"end":{"row":350,"column":3},"action":"insert","lines":["// "]},{"start":{"row":351,"column":0},"end":{"row":351,"column":3},"action":"insert","lines":["// "]},{"start":{"row":352,"column":0},"end":{"row":352,"column":3},"action":"insert","lines":["// "]},{"start":{"row":353,"column":0},"end":{"row":353,"column":3},"action":"insert","lines":["// "]},{"start":{"row":354,"column":0},"end":{"row":354,"column":3},"action":"insert","lines":["// "]},{"start":{"row":356,"column":0},"end":{"row":356,"column":3},"action":"insert","lines":["// "]},{"start":{"row":357,"column":0},"end":{"row":357,"column":3},"action":"insert","lines":["// "]},{"start":{"row":359,"column":0},"end":{"row":359,"column":3},"action":"insert","lines":["// "]},{"start":{"row":360,"column":0},"end":{"row":360,"column":3},"action":"insert","lines":["// "]},{"start":{"row":361,"column":0},"end":{"row":361,"column":3},"action":"insert","lines":["// "]},{"start":{"row":362,"column":0},"end":{"row":362,"column":3},"action":"insert","lines":["// "]},{"start":{"row":363,"column":0},"end":{"row":363,"column":3},"action":"insert","lines":["// "]},{"start":{"row":364,"column":0},"end":{"row":364,"column":3},"action":"insert","lines":["// "]},{"start":{"row":365,"column":0},"end":{"row":365,"column":3},"action":"insert","lines":["// "]},{"start":{"row":366,"column":0},"end":{"row":366,"column":3},"action":"insert","lines":["// "]},{"start":{"row":368,"column":0},"end":{"row":368,"column":3},"action":"insert","lines":["// "]},{"start":{"row":370,"column":0},"end":{"row":370,"column":3},"action":"insert","lines":["// "]},{"start":{"row":371,"column":0},"end":{"row":371,"column":3},"action":"insert","lines":["// "]},{"start":{"row":372,"column":0},"end":{"row":372,"column":3},"action":"insert","lines":["// "]},{"start":{"row":373,"column":0},"end":{"row":373,"column":3},"action":"insert","lines":["// "]},{"start":{"row":374,"column":0},"end":{"row":374,"column":3},"action":"insert","lines":["// "]},{"start":{"row":375,"column":0},"end":{"row":375,"column":3},"action":"insert","lines":["// "]},{"start":{"row":376,"column":0},"end":{"row":376,"column":3},"action":"insert","lines":["// "]},{"start":{"row":378,"column":0},"end":{"row":378,"column":3},"action":"insert","lines":["// "]},{"start":{"row":380,"column":0},"end":{"row":380,"column":3},"action":"insert","lines":["// "]},{"start":{"row":381,"column":0},"end":{"row":381,"column":3},"action":"insert","lines":["// "]},{"start":{"row":382,"column":0},"end":{"row":382,"column":3},"action":"insert","lines":["// "]},{"start":{"row":383,"column":0},"end":{"row":383,"column":3},"action":"insert","lines":["// "]},{"start":{"row":384,"column":0},"end":{"row":384,"column":3},"action":"insert","lines":["// "]},{"start":{"row":385,"column":0},"end":{"row":385,"column":3},"action":"insert","lines":["// "]},{"start":{"row":386,"column":0},"end":{"row":386,"column":3},"action":"insert","lines":["// "]},{"start":{"row":388,"column":0},"end":{"row":388,"column":3},"action":"insert","lines":["// "]},{"start":{"row":390,"column":0},"end":{"row":390,"column":3},"action":"insert","lines":["// "]},{"start":{"row":391,"column":0},"end":{"row":391,"column":3},"action":"insert","lines":["// "]},{"start":{"row":392,"column":0},"end":{"row":392,"column":3},"action":"insert","lines":["// "]},{"start":{"row":393,"column":0},"end":{"row":393,"column":3},"action":"insert","lines":["// "]},{"start":{"row":395,"column":0},"end":{"row":395,"column":3},"action":"insert","lines":["// "]},{"start":{"row":396,"column":0},"end":{"row":396,"column":3},"action":"insert","lines":["// "]},{"start":{"row":397,"column":0},"end":{"row":397,"column":3},"action":"insert","lines":["// "]},{"start":{"row":398,"column":0},"end":{"row":398,"column":3},"action":"insert","lines":["// "]},{"start":{"row":399,"column":0},"end":{"row":399,"column":3},"action":"insert","lines":["// "]},{"start":{"row":400,"column":0},"end":{"row":400,"column":3},"action":"insert","lines":["// "]},{"start":{"row":402,"column":0},"end":{"row":402,"column":3},"action":"insert","lines":["// "]},{"start":{"row":403,"column":0},"end":{"row":403,"column":3},"action":"insert","lines":["// "]},{"start":{"row":405,"column":0},"end":{"row":405,"column":3},"action":"insert","lines":["// "]},{"start":{"row":406,"column":0},"end":{"row":406,"column":3},"action":"insert","lines":["// "]},{"start":{"row":407,"column":0},"end":{"row":407,"column":3},"action":"insert","lines":["// "]},{"start":{"row":408,"column":0},"end":{"row":408,"column":3},"action":"insert","lines":["// "]},{"start":{"row":409,"column":0},"end":{"row":409,"column":3},"action":"insert","lines":["// "]},{"start":{"row":410,"column":0},"end":{"row":410,"column":3},"action":"insert","lines":["// "]},{"start":{"row":411,"column":0},"end":{"row":411,"column":3},"action":"insert","lines":["// "]},{"start":{"row":412,"column":0},"end":{"row":412,"column":3},"action":"insert","lines":["// "]},{"start":{"row":414,"column":0},"end":{"row":414,"column":3},"action":"insert","lines":["// "]},{"start":{"row":416,"column":0},"end":{"row":416,"column":3},"action":"insert","lines":["// "]},{"start":{"row":417,"column":0},"end":{"row":417,"column":3},"action":"insert","lines":["// "]},{"start":{"row":418,"column":0},"end":{"row":418,"column":3},"action":"insert","lines":["// "]},{"start":{"row":419,"column":0},"end":{"row":419,"column":3},"action":"insert","lines":["// "]},{"start":{"row":420,"column":0},"end":{"row":420,"column":3},"action":"insert","lines":["// "]},{"start":{"row":421,"column":0},"end":{"row":421,"column":3},"action":"insert","lines":["// "]},{"start":{"row":422,"column":0},"end":{"row":422,"column":3},"action":"insert","lines":["// "]},{"start":{"row":424,"column":0},"end":{"row":424,"column":3},"action":"insert","lines":["// "]},{"start":{"row":425,"column":0},"end":{"row":425,"column":3},"action":"insert","lines":["// "]}],[{"start":{"row":237,"column":3},"end":{"row":237,"column":7},"action":"remove","lines":["8000"],"id":36},{"start":{"row":237,"column":3},"end":{"row":237,"column":4},"action":"insert","lines":["7"]},{"start":{"row":237,"column":4},"end":{"row":237,"column":5},"action":"insert","lines":["5"]},{"start":{"row":237,"column":5},"end":{"row":237,"column":6},"action":"insert","lines":["0"]},{"start":{"row":237,"column":6},"end":{"row":237,"column":7},"action":"insert","lines":["0"]}],[{"start":{"row":635,"column":0},"end":{"row":635,"column":69},"action":"remove","lines":["   console.log('server start on port...' + process.env.PORT + '\\n'); "],"id":37},{"start":{"row":635,"column":0},"end":{"row":635,"column":65},"action":"insert","lines":["   console.log('server start...' + process.env.IP + \":\" + port); "]}],[{"start":{"row":8,"column":31},"end":{"row":9,"column":0},"action":"insert","lines":["",""],"id":38}],[{"start":{"row":9,"column":0},"end":{"row":9,"column":29},"action":"insert","lines":["const port = process.argv[2];"],"id":39}],[{"start":{"row":635,"column":26},"end":{"row":635,"column":27},"action":"remove","lines":["T"],"id":40},{"start":{"row":635,"column":25},"end":{"row":635,"column":26},"action":"remove","lines":["R"]},{"start":{"row":635,"column":24},"end":{"row":635,"column":25},"action":"remove","lines":["O"]},{"start":{"row":635,"column":23},"end":{"row":635,"column":24},"action":"remove","lines":["P"]},{"start":{"row":635,"column":22},"end":{"row":635,"column":23},"action":"remove","lines":["."]},{"start":{"row":635,"column":21},"end":{"row":635,"column":22},"action":"remove","lines":["v"]},{"start":{"row":635,"column":20},"end":{"row":635,"column":21},"action":"remove","lines":["n"]},{"start":{"row":635,"column":19},"end":{"row":635,"column":20},"action":"remove","lines":["e"]},{"start":{"row":635,"column":18},"end":{"row":635,"column":19},"action":"remove","lines":["."]},{"start":{"row":635,"column":17},"end":{"row":635,"column":18},"action":"remove","lines":["s"]},{"start":{"row":635,"column":16},"end":{"row":635,"column":17},"action":"remove","lines":["s"]},{"start":{"row":635,"column":15},"end":{"row":635,"column":16},"action":"remove","lines":["e"]},{"start":{"row":635,"column":14},"end":{"row":635,"column":15},"action":"remove","lines":["c"]},{"start":{"row":635,"column":13},"end":{"row":635,"column":14},"action":"remove","lines":["o"]},{"start":{"row":635,"column":12},"end":{"row":635,"column":13},"action":"remove","lines":["r"]},{"start":{"row":635,"column":11},"end":{"row":635,"column":12},"action":"remove","lines":["p"]}],[{"start":{"row":635,"column":11},"end":{"row":635,"column":12},"action":"insert","lines":["p"],"id":41},{"start":{"row":635,"column":12},"end":{"row":635,"column":13},"action":"insert","lines":["o"]},{"start":{"row":635,"column":13},"end":{"row":635,"column":14},"action":"insert","lines":["r"]},{"start":{"row":635,"column":14},"end":{"row":635,"column":15},"action":"insert","lines":["t"]}]]},"ace":{"folds":[],"scrolltop":6375,"scrollleft":0,"selection":{"start":{"row":637,"column":3},"end":{"row":637,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":287,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1543979193985,"hash":"a0e084accacd0c1123d49424a878c6a11e23c2f5"}