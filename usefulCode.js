
//Filter Highest Gainer / Loser on ETH Pairs.

binance.prevDay(false, (error, prevDay) => {
  let arr = [];
  for ( let obj of prevDay ) {
    let symbol = obj.symbol; 
    arr.push({symbol: symbol, change: +obj.priceChangePercent});
  }

    //Filters only ETH Pairs.    
    let newArr = arr.filter(o => { return o.symbol.substr(o.symbol.length -3) === 'ETH'; });
    
    let maxOfnewArr = Math.max.apply(Math, newArr.map(function(o) { return o.change; }));
    let minOfnewArr = Math.min.apply(Math, newArr.map(function(o) { return o.change; }));
    
    // Logs Highest Gainer & Loser of the Day
    let Gainer = arr.filter(o => { return o.symbol.substr(o.symbol.length -3) === 'ETH'; })
        .filter(o => { return o.change === maxOfnewArr });
      
    console.log('ETH Pairs - Highest Gainer & Highest Loser:');   
    console.log(Gainer);
        
    let Loser = arr.filter(o => { return o.symbol.substr(o.symbol.length -3) === 'ETH'; })
    .filter(o => { return o.change === minOfnewArr });
    
    console.log(Loser);
});
