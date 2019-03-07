# Node Cobinhood API  [![NPM downloads](https://img.shields.io/npm/dt/node-cobinhood-api.svg?style=flat-square&maxAge=86400)](https://www.npmjs.com/package/node-cobinhood-api)
Node Cobinhood API is a simple to use Node.js library for [Cobinhood](https://cobinhood.com) The World's First ZERO Trading Fees Cryptocurrency Exchange.

> NOTE: COBINHOOD IS CURRENTLY UNDER HEAVY DEVELOPMENT,
> APIs ARE SUBJECT TO CHANGE WITHOUT PRIOR NOTICE

[Cobinhood API documentation](https://cobinhood.github.io/api-public)

### Table of contents

* [Getting started](#getting-started)
  + [Installation](#installation)
  + [Main setup](#main-setup)
* [Public API](#public-api)
  + [Get the latest price of a symbol](#get-the-latest-price-of-a-symbol)
  + [Get depth of a symbol](#get-depth-of-a-symbol)
  + [Get all currencies](#get-all-currencies)
  + [Get info for all trading pairs](#get-info-for-all-trading-pairs)
  + [Get trading statistics](#get-trading-statistics)
  + [Get ticker of a symbol](#get-ticker-of-a-symbol)
  + [Get tickers of all symbols](#get-tickers-of-all-symbols)
  + [Get recent trades of a symbol](#get-recent-trades-of-a-symbol)
  + [Get candles of a symbol](#get-candles-of-a-symbol)
  + [Get server time](#get-server-time)
  + [Get server information](#get-server-information)
* [Trading API](#trading-api)
  + [Place a LIMIT BUY order](#place-a-limit-buy-order)
  + [Place a LIMIT SELL order](#place-a-limit-sell-order)
  + [Place a MARKET BUY order](#place-a-market-buy-order)
  + [Place a MARKET SELL order](#place-a-market-sell-order)
  + [Get an order's status](#get-an-orders-status)
  + [Cancel an order](#cancel-an-order)
  + [Modify an order](#modify-an-order)
  + [Get open orders of a symbol](#get-open-orders-of-a-symbol)
  + [Get all open orders](#get-all-open-orders)
  + [Get order's trades](#get-orders-trades)
  + [Get order history of a symbol](#get-order-history-of-a-symbol)
  + [Get all order history](#get-all-order-history)
* [Wallet API](#wallet-api)
  + [Get wallet balances](#get-wallet-balances)
  + [Get balance history of a currency](#get-balance-history-of-a-currency)
  + [Get all balance history](#get-all-balance-history)
  + [Get deposit addresses of a currency](#get-deposit-addresses-of-a-currency)
  + [Get all deposit addresses](#get-all-deposit-addresses)
  + [Get deposit's status](#get-deposits-status)
  + [Get all deposits](#get-all-deposits)
  + [Get withdrawal addresses of a currency](#get-withdrawal-addresses-of-a-currency)
  + [Get all withdrawal addresses](#get-all-withdrawal-addresses)
  + [Get withdrawal's status](#get-withdrawals-status)
  + [Get all withdrawals](#get-all-withdrawals)
* [Websockets](#websockets)
  + [Get trade updates of a symbol](#get-trade-updates-of-a-symbol)
  + [Get order book updates of a symbol](#get-order-book-updates-of-a-symbol)
  + [Get ticker updates of a symbol](#get-ticker-updates-of-a-symbol)
  + [Get candle updates of a symbol](#get-candle-updates-of-a-symbol)
  + [Get your's open orders updates](#get-yours-open-orders-updates)
  + [Subscribe to several websocket channels at once](#subscribe-to-several-websocket-channels-at-once)


## Getting started

#### Installation
```sh
npm install node-cobinhood-api
```

#### Main setup
```js
const cobinhood = require('node-cobinhood-api');

cobinhood.options({
    'apiKey': '<api key>',
    'verbose': true
});
```

## Public API

#### Get the latest price of a symbol
```js
cobinhood.lastPrice("COB-BTC", (error, lastPrice) => {
    if (!error) {
        console.log("COB-BTC last price:", lastPrice);
        // COB-BTC last price: 0.00001687
    }
});
```

#### Get depth of a symbol
```js
let limit = 10; // Optional. Defaults to 50 if not specified, if limit is 0, it means to fetch the whole order book.

cobinhood.orderBook("COB-BTC", (error, orderBook) => {
    if (!error) {
        console.log(orderBook);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
{ sequence: 0, // A sequence number that is updated on each orderbook state change
  bids: 
   [ { price: '0.00001615', orders: '1', quantity: '2000' },
     { price: '0.00001611', orders: '2', quantity: '1643.07076472' },
     { price: '0.0000161', orders: '2', quantity: '2137.4987851' },
     { price: '0.00001602', orders: '3', quantity: '4051.77902621' },
     { price: '0.00001601', orders: '3', quantity: '54500' },
     { price: '0.000016', orders: '1', quantity: '200' },
     { price: '0.00001599', orders: '1', quantity: '200' },
     { price: '0.00001598', orders: '1', quantity: '200' },
     { price: '0.00001597', orders: '1', quantity: '200' },
     { price: '0.00001596', orders: '1', quantity: '200' } ],
  asks: 
   [ { price: '0.0000166', orders: '1', quantity: '427.29060805' },
     { price: '0.00001688', orders: '1', quantity: '600' },
     { price: '0.00001691', orders: '2', quantity: '5136.79420461' },
     { price: '0.0000173', orders: '1', quantity: '2000' },
     { price: '0.00001731', orders: '1', quantity: '8656.09357823' },
     { price: '0.00001733', orders: '1', quantity: '572' },
     { price: '0.00001734', orders: '1', quantity: '690.98028617' },
     { price: '0.00001735', orders: '2', quantity: '1909.65293563' },
     { price: '0.0000174', orders: '1', quantity: '623.56476684' },
     { price: '0.00001741', orders: '1', quantity: '500' } ] }
```
</details>

#### Get all currencies
Returns info for all currencies available for trade
```js
cobinhood.currencies((error, currencies) => {
    if (!error) {
        console.log(currencies);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { currency: 'BTC',
    name: 'Bitcoin',
    min_unit: '0.00000001',
    deposit_fee: '0',
    withdrawal_fee: '0.001' },
  { currency: 'COB',
    name: 'Cobinhood Token',
    min_unit: '0.00000001',
    deposit_fee: '0',
    withdrawal_fee: '43.39' },
  ...
]
```
</details>

#### Get info for all trading pairs
```js
cobinhood.tradingPairs((error, tradingPairs) => {
    if (!error) {
        console.log(tradingPairs);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { id: 'COB-BTC',
    base_currency_id: 'COB',
    quote_currency_id: 'BTC',
    base_max_size: '5165662.806',
    base_min_size: '154.969',
    quote_increment: '0.00000001' },
  { id: 'COB-ETH',
    base_currency_id: 'COB',
    quote_currency_id: 'ETH',
    base_max_size: '5165662.806',
    base_min_size: '154.969',
    quote_increment: '0.0000001' },
  ...
]
```
</details>

#### Get trading statistics
```js
cobinhood.stats((error, stats) => {
    if (!error) {
        console.log(stats);
    }
});
```

<details>
<summary>Response</summary>

```js
{ 'COB-BTC': 
   { id: 'COB-BTC',
     last_price: '0.00001611',
     lowest_ask: '0.0000161',
     highest_bid: '0.00001779',
     base_volume: '320442.45023293',
     quote_volume: '5.4801039201211806',
     is_frozen: false,
     high_24hr: '0.00001894',
     low_24hr: '0.0000161',
     percent_changed_24hr: '-0.070398153491056' },
  'COB-ETH': 
   { id: 'COB-ETH',
     last_price: '0.0002008',
     lowest_ask: '0.0002007',
     highest_bid: '0.0002202',
     base_volume: '822814.89034178',
     quote_volume: '174.865914947356928',
     is_frozen: false,
     high_24hr: '0.0002243',
     low_24hr: '0.0002004',
     percent_changed_24hr: '-0.0664807066480707' },
  ...
}
```
</details>

#### Get ticker of a symbol
```js
cobinhood.ticker("COB-BTC", (error, ticker) => {
    if (!error) {
        console.log(ticker);
    }
});
```

<details>
<summary>Response</summary>

```js
{ trading_pair_id: 'COB-BTC',
  timestamp: 1519307340000,
  '24h_high': '0.00001894',
  '24h_low': '0.0000161',
  '24h_open': '0.00001734',
  '24h_volume': '321346.24401148',
  last_trade_price: '0.00001611',
  highest_bid: '0.00001612',
  lowest_ask: '0.0000163' }
```
</details>

#### Get tickers of all symbols
```js
cobinhood.tickers((error, tickers) => {
    if (!error) {
        console.log(tickers);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { trading_pair_id: 'MANA-ETH',
    timestamp: 1520115000000,
    '24h_high': '0.0001278',
    '24h_low': '0.0001106',
    '24h_open': '0.0001106',
    '24h_volume': '3224.93485295',
    last_trade_price: '0.000125',
    highest_bid: '0.0001133',
    lowest_ask: '0.0001365' },
  { trading_pair_id: 'SPHTX-USDT',
    timestamp: 1520115000000,
    '24h_high': '0',
    '24h_low': '0',
    '24h_open': '0',
    '24h_volume': '0',
    last_trade_price: '0',
    highest_bid: '0.0578',
    lowest_ask: '3.9956' },
  { trading_pair_id: 'BDG-USDT',
    timestamp: 1520115000000,
    '24h_high': '0.149',
    '24h_low': '0.149',
    '24h_open': '0.149',
    '24h_volume': '0',
    last_trade_price: '0.149',
    highest_bid: '0.01173',
    lowest_ask: '0.14599' },
  ...
]
```
</details>

#### Get recent trades of a symbol
```js
let limit = 2; // Optional. Defaults to 20 if not specified, max 50.

cobinhood.trades("COB-BTC", (error, trades) => {
    if (!error) {
        console.log(trades);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
[ { id: 'ff41c738-4ee3-4c43-84c0-d448adb4344b',
    maker_side: 'ask',
    timestamp: 1519295760515,
    price: '0.0000171',
    size: '435.97269025' },
  { id: '3d30dd75-a70e-46db-955b-3dd5b9334a9e',
    maker_side: 'bid',
    timestamp: 1519295474495,
    price: '0.0000171',
    size: '159.25555556' } ]
```
</details>

#### Get candles of a symbol
```js
let timeframe = '5m'; // Timeframes: 1m, 5m, 15m, 30m, 1h, 3h, 6h, 12h, 1D, 7D, 14D, 1M
let startTime = 1519307723000; // Optional. Unix timestamp in milliseconds. Defaults to 0 if not specified. You can set it to false.
let endTime   = 1519308723000; // Optional. Unix timestamp in milliseconds. Defaults to current server time if not specified. You can set it to false.

cobinhood.candles("COB-BTC", timeframe, (error, candles) => {
    if (!error) {
        console.log(candles);
    }
}, endTime, startTime);
```

<details>
<summary>Response</summary>

```js
[ { timeframe: '5m',
    trading_pair_id: 'COB-BTC',
    timestamp: 1519307700000,
    volume: '0',
    open: '0.0000162',
    close: '0.0000162',
    high: '0.0000162',
    low: '0.0000162' },
  { timeframe: '5m',
    trading_pair_id: 'COB-BTC',
    timestamp: 1519308000000,
    volume: '0',
    open: '0.0000162',
    close: '0.0000162',
    high: '0.0000162',
    low: '0.0000162' },
  { timeframe: '5m',
    trading_pair_id: 'COB-BTC',
    timestamp: 1519308300000,
    volume: '814.81238504',
    open: '0.0000163',
    close: '0.00001631',
    high: '0.00001631',
    low: '0.0000163' },
  { timeframe: '5m',
    trading_pair_id: 'COB-BTC',
    timestamp: 1519308600000,
    volume: '0',
    open: '0.00001631',
    close: '0.00001631',
    high: '0.00001631',
    low: '0.00001631' } ]
```
</details>

#### Get server time
Returns server Unix timestamp in milliseconds
```js
cobinhood.serverTime((error, serverTime) => {
    if (!error) {
        console.log("Server time:", serverTime);
        // Server time: 1519570081809
    }
});
```

#### Get server information
```js
cobinhood.serverInfo((error, serverInfo) => {
    if (!error) {
        console.log(serverInfo);
    }
});
```

<details>
<summary>Response</summary>

```js
{ phase: 'production', revision: 'aa77d8' }
```
</details>

## Trading API

#### Place a LIMIT BUY order
```js
let price = 0.000017;
let quantity = 1000;

cobinhood.limitBuy("COB-BTC", price, quantity, (error, order) => {
    if (!error) {
        console.log(order);
    }
});
```

<details>
<summary>Response</summary>

```js
{ id: '37f550a2-2aa6-20f4-a3fe-e120f420637c',
  trading_pair: 'COB-BTC',
  side: 'bid',
  type: 'limit',
  price: '0.000017',
  size: '1000',
  filled: '0',
  state: 'queued',
  timestamp: 1519314758661,
  eq_price: '0',
  completed_at: null }
```
</details>

#### Place a LIMIT SELL order
```js
let price = 0.000017;
let quantity = 1000;

cobinhood.limitSell("COB-BTC", price, quantity, (error, order) => {
    if (!error) {
        console.log(order);
    }
});
```

<details>
<summary>Response</summary>

```js
{ id: '37f550a2-2aa6-20f4-a3fe-e120f420637c',
  trading_pair: 'COB-BTC',
  side: 'ask',
  type: 'limit',
  price: '0.000017',
  size: '1000',
  filled: '0',
  state: 'queued',
  timestamp: 1519314758661,
  eq_price: '0',
  completed_at: null }
```
</details>

#### Place a MARKET BUY order
```js
let quantity = 1000;

cobinhood.marketBuy("COB-BTC", quantity, (error, order) => {
    if (!error) {
        console.log(order);
    }
});
```

<details>
<summary>Response</summary>

```js
{ id: '37f550a2-2aa6-20f4-a3fe-e120f420637c',
  trading_pair: 'COB-BTC',
  side: 'bid',
  type: 'market',
  price: '0',
  size: '1000',
  filled: '0',
  state: 'queued',
  timestamp: 1519314758661,
  eq_price: '0',
  completed_at: null }
```
</details>

#### Place a MARKET SELL order
```js
let quantity = 1000;

cobinhood.marketSell("COB-BTC", quantity, (error, order) => {
    if (!error) {
        console.log(order);
    }
});
```

<details>
<summary>Response</summary>

```js
{ id: '37f550a2-2aa6-20f4-a3fe-e120f420637c',
  trading_pair: 'COB-BTC',
  side: 'ask',
  type: 'market',
  price: '0',
  size: '1000',
  filled: '0',
  state: 'queued',
  timestamp: 1519314758661,
  eq_price: '0',
  completed_at: null }
```
</details>

#### Get an order's status
```js
let orderId = '37f550a2-2aa6-20f4-a3fe-e120f420637c';

cobinhood.orderStatus(orderId, (error, order) => {
    if (!error) {
        console.log(order);
    }
});
```

<details>
<summary>Response</summary>

```js
{ id: '37f550a2-2aa6-20f4-a3fe-e120f420637c',
  trading_pair: 'COB-BTC',
  side: 'bid',
  type: 'market',
  price: '0',
  size: '1000',
  filled: '0',
  state: 'rejected',
  timestamp: 1519314758661,
  eq_price: '0',
  completed_at: '2018-02-22T16:42:38.716476Z' }
```
</details>

#### Cancel an order
```js
let orderId = '37f550a2-2aa6-20f4-a3fe-e120f420637c';

cobinhood.orderCancel(orderId, (error, success) => {
    if (!error && success) {
        console.log("Order cancelled");
        // Order cancelled
    }
});
```

#### Modify an order
```js
let orderId = '37f550a2-2aa6-20f4-a3fe-e120f420637c';
let price = 0.000018;
let quantity = 1000;

cobinhood.orderModify(orderId, price, quantity, (error, success) => {
    if (!error && success) {
        console.log("Order modified");
        // Order modified
    }
});
```

#### Get open orders of a symbol
```js
let limit = 2; // Optional. Defaults to 20 if not specified, max 50.

cobinhood.openOrders("COB-ETH", (error, openOrders) => {
    if (!error) {
        console.log(openOrders);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
[ { id: 'ccb0c81c-08be-4df5-afe4-18039fd533ed',
    trading_pair: 'COB-ETH',
    side: 'bid',
    type: 'limit',
    price: '0.0001',
    size: '200',
    filled: '0',
    state: 'open',
    timestamp: 1519322294967,
    eq_price: '0',
    completed_at: null } ]
```
</details>

#### Get all open orders
```js
let limit = 2; // Optional. Defaults to 20 if not specified, max 50.

cobinhood.openOrdersAll((error, openOrdersAll) => {
    if (!error) {
        console.log(openOrdersAll);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
[ { id: 'a0338ca4-689f-4698-b5cb-961f515243a9',
    trading_pair: 'BRD-ETH',
    side: 'bid',
    type: 'limit',
    price: '0.0004',
    size: '40',
    filled: '0',
    state: 'open',
    timestamp: 1519322329670,
    eq_price: '0',
    completed_at: null },
  { id: 'ccb0c81c-08be-4df5-afe4-18039fd533ed',
    trading_pair: 'COB-ETH',
    side: 'bid',
    type: 'limit',
    price: '0.0001',
    size: '200',
    filled: '0',
    state: 'open',
    timestamp: 1519322294967,
    eq_price: '0',
    completed_at: null } ]
```
</details>

#### Get order's trades
```js
let orderId = '37f550a2-2aa6-20f4-a3fe-e120f420637c';

cobinhood.orderTrades(orderId, (error, orderTrades) => {
    if (!error) {
        console.log(orderTrades);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { id: '09619448e48a3bd73d493a4194f9020b',
    price: '10.00000000',
    size: '0.01000000',
    maker_side: 'bid',
    timestamp: 1504459805123 },
  { id: '943829d8798d7d9s87984787d89799dd',
    price: '10.00000000',
    size: '0.05000000',
    maker_side: 'bid',
    timestamp: 1504459815765 } ]
```
</details>

#### Get order history of a symbol
```js
let limit = 2; // Optional. Defaults to 50 if not specified.

cobinhood.orderHistory("COB-BTC", (error, orderHistory) => {
    if (!error) {
        console.log(orderHistory);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
[ { id: '37f550a2-2aa6-20f4-a3fe-e120f420637c',
    trading_pair: 'COB-BTC',
    side: 'ask',
    type: 'limit',
    price: '0.000017',
    size: '1000',
    filled: '0',
    state: 'cancelled',
    timestamp: 1519321076327,
    eq_price: '0',
    completed_at: '2018-02-22T17:38:25.325001Z' },
  { id: 'e120f420-2aa6-20f4-a3fe-37f550a2637c',
    trading_pair: 'COB-BTC',
    side: 'bid',
    type: 'limit',
    price: '0.000017',
    size: '1000',
    filled: '1000',
    state: 'filled',
    timestamp: 1519320455598,
    eq_price: '0.000017',
    completed_at: '2018-02-22T17:35:30.412993Z' } ]
```
</details>

#### Get all order history
```js
let limit = 2; // Optional. Defaults to 50 if not specified.

cobinhood.orderHistoryAll((error, orderHistoryAll) => {
    if (!error) {
        console.log(orderHistoryAll);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
[ { id: 'fab424b8-10d0-4d0b-9407-a5262a1b2860',
    trading_pair: 'COB-ETH',
    side: 'bid',
    type: 'limit',
    price: '0.0002089',
    size: '200',
    filled: '200',
    state: 'filled',
    timestamp: 1519321698331,
    eq_price: '0.0002089',
    completed_at: '2018-02-22T17:53:16.55734Z' },
  { id: '37f550a2-2aa6-20f4-a3fe-e120f420637c',
    trading_pair: 'COB-BTC',
    side: 'ask',
    type: 'limit',
    price: '0.000017',
    size: '1000',
    filled: '0',
    state: 'cancelled',
    timestamp: 1519321076327,
    eq_price: '0',
    completed_at: '2018-02-22T17:38:25.325001Z' } ]
```
</details>

## Wallet API

#### Get wallet balances
```js
cobinhood.balances((error, balances) => {
    if (!error) {
        console.log(balances);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { currency: 'BTC',
    type: 'exchange',
    total: '0',
    on_order: '0',
    locked: false },
  { currency: 'ETH',
    type: 'exchange',
    total: '0.09849225',
    on_order: '0.04',
    locked: false },
  { currency: 'COB',
    type: 'exchange',
    total: '2000',
    on_order: '0',
    locked: false } ]
```
</details>

#### Get balance history of a currency
```js
let limit = 3; // Defaults to 20 if not specified, max 50.

cobinhood.balanceHistory("ETH", (error, balanceHistory) => {
    if (!error) {
        console.log(balanceHistory);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
[ { timestamp: '2018-02-27T03:11:45.132432Z',
    currency: 'ETH',
    type: 'exchange',
    action: 'withdraw',
    amount: '0.000543',
    balance: '0',
    trade_id: null,
    deposit_id: null,
    withdrawal_id: '09619448-985d-4485-835e-b69096194482',
    fiat_deposit_id: null,
    fiat_withdrawal_id: null },
  { timestamp: '2018-02-26T23:14:08.435243Z',
    currency: 'ETH',
    type: 'exchange',
    action: 'trade',
    amount: '0.000543',
    balance: '0.050543',
    trade_id: '09619448-985d-4485-835e-b69096194482',
    deposit_id: null,
    withdrawal_id: null,
    fiat_deposit_id: null,
    fiat_withdrawal_id: null },
  { timestamp: '2018-02-26T17:18:59.428914Z',
    currency: 'ETH',
    type: 'exchange',
    action: 'deposit',
    amount: '0.05',
    balance: '0.05',
    trade_id: null,
    deposit_id: '09619448-985d-4485-835e-b69096194482',
    withdrawal_id: null,
    fiat_deposit_id: null,
    fiat_withdrawal_id: null } ]
```
</details>

#### Get all balance history
```js
let limit = 3; // Defaults to 20 if not specified, max 50.

cobinhood.balanceHistoryAll((error, balanceHistoryAll) => {
    if (!error) {
        console.log(balanceHistoryAll);
    }
}, limit);
```

<details>
<summary>Response</summary>

```js
[ { timestamp: '2018-02-27T03:11:45.132432Z',
    currency: 'ETH',
    type: 'exchange',
    action: 'withdraw',
    amount: '0.000543',
    balance: '0',
    trade_id: null,
    deposit_id: null,
    withdrawal_id: '09619448-985d-4485-835e-b69096194482',
    fiat_deposit_id: null,
    fiat_withdrawal_id: null },
  { timestamp: '2018-02-26T23:14:08.435243Z',
    currency: 'COB',
    type: 'exchange',
    action: 'trade',
    amount: '100',
    balance: '2100',
    trade_id: '09619448-985d-4485-835e-b69096194482',
    deposit_id: null,
    withdrawal_id: null,
    fiat_deposit_id: null,
    fiat_withdrawal_id: null },
  { timestamp: '2018-02-26T17:18:59.428914Z',
    currency: 'BTC',
    type: 'exchange',
    action: 'deposit',
    amount: '0.05',
    balance: '0.05',
    trade_id: null,
    deposit_id: '09619448-985d-4485-835e-b69096194482',
    withdrawal_id: null,
    fiat_deposit_id: null,
    fiat_withdrawal_id: null } ]
```
</details>

#### Get deposit addresses of a currency
```js
cobinhood.depositAddresses("ETH", (error, depositAddresses) => {
    if (!error) {
        console.log(depositAddresses);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { address: '0xbcd7defe48a19f758a1c1a9706e808072391bc20',
    created_at: 1519234408062,
    currency: 'ETH',
    type: 'exchange' } ]
```
</details>

#### Get all deposit addresses
```js
cobinhood.depositAddressesAll((error, depositAddressesAll) => {
    if (!error) {
        console.log(depositAddressesAll);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { address: '0xbcd7defe48a19f758a1c1a9706e808072391bc20',
    created_at: 1519234408062,
    currency: 'ETH',
    type: 'exchange' },
  { address: '0xbff7defe48a09619448e48a3bd73a4194f9020b3',
    created_at: 1519232304035,
    currency: 'BTC',
    type: 'exchange' },
  ...
]
```
</details>

#### Get deposit's status
```js
let depositId = '09619448-985d-4485-835e-b69096194482';

cobinhood.depositStatus(depositId, (error, depositStatus) => {
    if (!error) {
        console.log(depositStatus);
    }
});
```

<details>
<summary>Response</summary>

```js
{ amount: '0.05',
  completed_at: 1519319949428,
  confirmations: 25,
  created_at: 1519319554624,
  currency: 'ETH',
  deposit_id: '09619448-985d-4485-835e-b69096194482',
  fee: '0',
  from_address: '0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98',
  required_confirmations: 25,
  status: 'tx_confirmed',
  txhash: '0x3f694510b9fca0ce645347be2525726473b541c86f5756de9ee693005d72bb23',
  user_id: 'efb9f645-f457-413b-b187-93cab09d8727' }
```
</details>

#### Get all deposits
```js
cobinhood.deposits((error, deposits) => {
    if (!error) {
        console.log(deposits);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { amount: '0.05',
    completed_at: 1519319949428,
    confirmations: 25,
    created_at: 1519319554624,
    currency: 'ETH',
    deposit_id: '09619448-985d-4485-835e-b69096194482',
    fee: '0',
    from_address: '0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98',
    required_confirmations: 25,
    status: 'tx_confirmed',
    txhash: '0x3f694510b9fca0ce645347be2525726473b541c86f5756de9ee693005d72bb23',
    user_id: 'efb9f645-f457-413b-b187-93cab09d8727' },
  { amount: '0.2',
    completed_at: 15193100495243,
    confirmations: 25,
    created_at: 1519319554624,
    currency: 'BTC',
    deposit_id: '74f6376d-985d-4485-835e-b69096194482',
    fee: '0',
    from_address: '0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98',
    required_confirmations: 25,
    status: 'tx_confirmed',
    txhash: '0x3f694510b9fca0ce645347be2525726473b541c86f5756de9ee693005d72bb23',
    user_id: 'efb9f645-f457-413b-b187-93cab09d8727' },
  ...
]
```
</details>

#### Get withdrawal addresses of a currency
```js
cobinhood.withdrawalAddresses("ETH", (error, withdrawalAddresses) => {
    if (!error) {
        console.log(withdrawalAddresses);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { id: '6b01c8ac-3075-4ae5-a485-881d67Fe78fb',
    name: 'Seychelles',
    type: 'exchange',
    currency: 'ETH',
    address: '0xA6854dFD1BA0635f03a275ce9f3b310F52396673',
    created_at: 1519723240162 } ]
```
</details>

#### Get all withdrawal addresses
```js
cobinhood.withdrawalAddressesAll((error, withdrawalAddressesAll) => {
    if (!error) {
        console.log(withdrawalAddressesAll);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { id: '6b01c8ac-3075-4ae5-a485-881d67Fe78fb',
    name: 'Seychelles',
    type: 'exchange',
    currency: 'ETH',
    address: '0xA6854dFD1BA0635f03a275ce9f3b310F52396673',
    created_at: 1519723240162 },
  { id: '6b01c8ac-3075-4ae5-a485-881d67Fe78fb',
    name: 'Wakanda',
    type: 'exchange',
    currency: 'BTC',
    address: '0xA6854dFD1BA0635f03a275ce9f3b310F52396673',
    created_at: 1519723240162 }
  ...
]
```
</details>

#### Get withdrawal's status
```js
let withdrawalId = '09619448-985d-4485-835e-b69096194482';

cobinhood.withdrawalStatus(withdrawalId, (error, withdrawalStatus) => {
    if (!error) {
        console.log(withdrawalStatus);
    }
});
```

<details>
<summary>Response</summary>

```js
{ "withdrawal_id": "62056df2d4cf8fb9b15c7238b89a1438",
  "user_id": "62056df2d4cf8fb9b15c7238b89a1438",
  "status": "pending",
  "confirmations": 25,
  "required_confirmations": 25,
  "created_at": 1504459805123,
  "sent_at": 1504459805123
  "completed_at": 1504459914233,
  "updated_at": 1504459914233,
  "to_address": "0xbcd7defe48a19f758a1c1a9706e808072391bc20",
  "txhash": "0xf6ca576fb446893432d55ec53e93b7dcfbbf75b548570b2eb8b1853de7aa7233",
  "currency": "BTC",
  "amount": "0.021",
  "fee": "0.0003" }
```
</details>

#### Get all withdrawals
```js
cobinhood.withdrawals((error, withdrawals) => {
    if (!error) {
        console.log(withdrawals);
    }
});
```

<details>
<summary>Response</summary>

```js
[ { "withdrawal_id": "62056df2d4cf8fb9b15c7238b89a1438",
    "user_id": "62056df2d4cf8fb9b15c7238b89a1438",
    "status": "pending",
    "confirmations": 25,
    "required_confirmations": 25,
    "created_at": 1504459805123,
    "sent_at": 1504459805123
    "completed_at": 1504459914233,
    "updated_at": 1504459914233,
    "to_address": "0xbcd7defe48a19f758a1c1a9706e808072391bc20",
    "txhash": "0xf6ca576fb446893432d55ec53e93b7dcfbbf75b548570b2eb8b1853de7aa7233",
    "currency": "BTC",
    "amount": "0.021",
    "fee": "0.0003" },
  ...
]
```
</details>

## Websockets

#### Get trade updates of a symbol
Returns two types of messages: "snapshot" and "update"
```js
let channel = {
    "type": 'trade',
    "trading_pair_id": 'COB-BTC'
};
let reconnect = false; // Optional. Defaults to true if not specified.

cobinhood.websocket(channel, (error, message) => {
    if (!error) {
        console.log(message);
    }
}, reconnect);
```

<details>
<summary>Response (snapshot)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "snapshot":
        [
          [TRADE_ID, TIME_STAMP, PRICE, SIZE, MAKER_SIDE],
          ...
        ]
}
```
</details>

<details>
<summary>Response (update)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "update":
        [
          [TRADE_ID, TIME_STAMP, PRICE, SIZE, MAKER_SIDE],
          ...
        ]
}
```
</details>

#### Get order book updates of a symbol
Returns two types of messages: "snapshot" and "update"
```js
let channel = {
    "type": 'order-book',
    "trading_pair_id": 'COB-BTC',
    "precision": '1E-7' // Optional. Defaults to 1E-7 if not specified.
};
let reconnect = false; // Optional. Defaults to true if not specified.

cobinhood.websocket(channel, (error, message) => {
    if (!error) {
        console.log(message);
    }
}, reconnect);
```

<details>
<summary>Response (snapshot)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "snapshot":  {
        "bids": [
            [ PRICE, SIZE, COUNT ],
            ...
        ],
        "asks": [
            [ PRICE, SIZE, COUNT ],
            ...
        ]
    }
}
```
</details>

<details>
<summary>Response (update)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "update":  {
        "bids": [
            [ PRICE, SIZE, COUNT ],
            ...
        ],
        "asks": [
            [ PRICE, SIZE, COUNT ],
            ...
        ]
    }
}
```
</details>

#### Get ticker updates of a symbol
Returns two types of messages: "snapshot" and "update"
```js
let channel = {
    "type": 'ticker',
    "trading_pair_id": 'COB-BTC'
};
let reconnect = false; // Optional. Defaults to true if not specified.

cobinhood.websocket(channel, (error, message) => {
    if (!error) {
        console.log(message);
    }
}, reconnect);
```

<details>
<summary>Response (snapshot)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "snapshot":
        [
          LAST_TRADE_ID,
          PRICE,
          HIGHEST_BID,
          LOWEST_ASK,
          24H_VOLUME,
          24H_HIGH,
          24H_LOW,
          24H_OPEN,
          TIME_STAMP,
        ]
}
```
</details>

<details>
<summary>Response (update)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "update":
        [
          LAST_TRADE_ID,
          PRICE,
          HIGHEST_BID,
          LOWEST_ASK,
          24H_VOLUME,
          24H_HIGH,
          24H_LOW,
          24H_OPEN,
          TIME_STAMP,
        ]
}
```
</details>

#### Get candle updates of a symbol
Returns two types of messages: "snapshot" and "update"
```js
let channel = {
    "type": 'candle',
    "trading_pair_id": 'COB-BTC',
    "timeframe": '5m' // Timeframes: 1m, 5m, 15m, 30m, 1h, 3h, 6h, 12h, 1D, 7D, 14D, 1M
};
let reconnect = false; // Optional. Defaults to true if not specified.

cobinhood.websocket(channel, (error, message) => {
    if (!error) {
        console.log(message);
    }
}, reconnect);
```

<details>
<summary>Response (snapshot)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "snapshot":
        [
          [TIME, OPEN, CLOSE, HIGH, LOW, VOL],
          ...
        ]
}
```
</details>

<details>
<summary>Response (update)</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "update":
        [
          [TIME, OPEN, CLOSE, HIGH, LOW, VOL],
          ...
        ]
}
```
</details>

#### Get your's open orders updates
```js
let channel = {
    "type": 'order'
};
let reconnect = false; // Optional. Defaults to true if not specified.

cobinhood.websocket(channel, (error, message) => {
    if (!error) {
        console.log(message);
    }
}, reconnect);
```

<details>
<summary>Response</summary>

```js
{
    "channel_id": CHANNEL_ID,
    "update":
        [
            ORDER_ID,
            TRADING_PAIR_ID,
            STATUS,
            SIDE,
            TYPE,
            PRICE,
            SIZE,
            FILLED_SIZE,
            TIME_STAMP
         ]
}
```
</details>

#### Subscribe to several websocket channels at once
You can subscribe to different types of channels and/or different symbols
```js
let channels = [{
    "type": 'trade',
    "trading_pair_id": 'COB-BTC'
},{
    "type": 'order-book',
    "trading_pair_id": 'COB-BTC',
    "precision": '1E-7' // Optional. Defaults to 1E-7 if not specified.
},{
    "type": 'ticker',
    "trading_pair_id": 'COB-BTC'
},{
    "type": 'candle',
    "trading_pair_id": 'COB-BTC',
    "timeframe": '5m' // Timeframes: 1m, 5m, 15m, 30m, 1h, 3h, 6h, 12h, 1D, 7D, 14D, 1M
},{
    "type": 'order'
}];
let reconnect = false; // Optional. Defaults to true if not specified.

cobinhood.websocket(channels, (error, message) => {
    if (!error) {
        console.log(message);
    }
}, reconnect);
```

## Todos
 - Examples
 - Logs