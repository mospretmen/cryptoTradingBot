{"filter":false,"title":"TradeHistory.js","tooltip":"/models/TradeHistory.js","undoManager":{"mark":72,"position":72,"stack":[[{"start":{"row":4,"column":0},"end":{"row":23,"column":3},"action":"remove","lines":["  email: {","    type: String,","    unique: true,","    required: true,","    trim: true,","    minlength: 1,","    validate: {","        validator: validator.isEmail,","        message: '{VALUE} is not a valid email' ","    },","  },","  password: {","    type: String,","    required: true,","    minlength: 6","  },","  passwordConf: {","    type: String,","    required: true,","  }"],"id":2},{"start":{"row":4,"column":0},"end":{"row":14,"column":1},"action":"insert","lines":["{","    \"_id\": \"id\",","    \"Date(UTC)\": \"Date(UTC)\",","    \"Market\": \"Market\",","    \"Type\": \"Type\",","    \"Price\": \"Price\",","    \"Amount\": \"Amount\",","    \"Total\": \"Total\",","    \"Fee\": \"Fee\",","    \"Fee Coin\": \"Fee Coin\"","}"]}],[{"start":{"row":4,"column":0},"end":{"row":4,"column":2},"action":"insert","lines":["  "],"id":3},{"start":{"row":5,"column":0},"end":{"row":5,"column":2},"action":"insert","lines":["  "]},{"start":{"row":6,"column":0},"end":{"row":6,"column":2},"action":"insert","lines":["  "]},{"start":{"row":7,"column":0},"end":{"row":7,"column":2},"action":"insert","lines":["  "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":2},"action":"insert","lines":["  "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":2},"action":"insert","lines":["  "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":2},"action":"insert","lines":["  "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":2},"action":"insert","lines":["  "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":2},"action":"insert","lines":["  "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":2},"action":"insert","lines":["  "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":5,"column":10},"end":{"row":5,"column":11},"action":"remove","lines":["\""],"id":4}],[{"start":{"row":5,"column":7},"end":{"row":5,"column":8},"action":"remove","lines":["_"],"id":5},{"start":{"row":5,"column":6},"end":{"row":5,"column":7},"action":"remove","lines":["\""]}],[{"start":{"row":5,"column":6},"end":{"row":5,"column":8},"action":"insert","lines":["  "],"id":6}],[{"start":{"row":5,"column":6},"end":{"row":5,"column":8},"action":"remove","lines":["  "],"id":7}],[{"start":{"row":5,"column":0},"end":{"row":5,"column":15},"action":"remove","lines":["      id: \"id\","],"id":8},{"start":{"row":4,"column":3},"end":{"row":5,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":5,"column":16},"end":{"row":5,"column":17},"action":"remove","lines":["\""],"id":9}],[{"start":{"row":5,"column":6},"end":{"row":5,"column":7},"action":"remove","lines":["\""],"id":10}],[{"start":{"row":5,"column":17},"end":{"row":5,"column":28},"action":"remove","lines":["\"Date(UTC)\""],"id":11},{"start":{"row":5,"column":17},"end":{"row":5,"column":18},"action":"insert","lines":["D"]}],[{"start":{"row":5,"column":17},"end":{"row":5,"column":18},"action":"remove","lines":["D"],"id":12},{"start":{"row":5,"column":17},"end":{"row":5,"column":23},"action":"insert","lines":["Date()"]}],[{"start":{"row":5,"column":22},"end":{"row":5,"column":23},"action":"remove","lines":[")"],"id":13},{"start":{"row":5,"column":21},"end":{"row":5,"column":22},"action":"remove","lines":["("]}],[{"start":{"row":6,"column":23},"end":{"row":6,"column":24},"action":"remove","lines":["\""],"id":14},{"start":{"row":6,"column":22},"end":{"row":6,"column":23},"action":"remove","lines":["t"]},{"start":{"row":6,"column":21},"end":{"row":6,"column":22},"action":"remove","lines":["e"]},{"start":{"row":6,"column":20},"end":{"row":6,"column":21},"action":"remove","lines":["k"]},{"start":{"row":6,"column":19},"end":{"row":6,"column":20},"action":"remove","lines":["r"]},{"start":{"row":6,"column":18},"end":{"row":6,"column":19},"action":"remove","lines":["a"]},{"start":{"row":6,"column":17},"end":{"row":6,"column":18},"action":"remove","lines":["M"]},{"start":{"row":6,"column":16},"end":{"row":6,"column":17},"action":"remove","lines":["\""]}],[{"start":{"row":6,"column":16},"end":{"row":6,"column":17},"action":"insert","lines":["S"],"id":15},{"start":{"row":6,"column":17},"end":{"row":6,"column":18},"action":"insert","lines":["t"]},{"start":{"row":6,"column":18},"end":{"row":6,"column":19},"action":"insert","lines":["r"]},{"start":{"row":6,"column":19},"end":{"row":6,"column":20},"action":"insert","lines":["i"]},{"start":{"row":6,"column":20},"end":{"row":6,"column":21},"action":"insert","lines":["n"]},{"start":{"row":6,"column":21},"end":{"row":6,"column":22},"action":"insert","lines":["g"]}],[{"start":{"row":7,"column":19},"end":{"row":7,"column":20},"action":"remove","lines":["\""],"id":16},{"start":{"row":7,"column":18},"end":{"row":7,"column":19},"action":"remove","lines":["e"]},{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"remove","lines":["p"]},{"start":{"row":7,"column":16},"end":{"row":7,"column":17},"action":"remove","lines":["y"]},{"start":{"row":7,"column":15},"end":{"row":7,"column":16},"action":"remove","lines":["T"]},{"start":{"row":7,"column":14},"end":{"row":7,"column":15},"action":"remove","lines":["\""]}],[{"start":{"row":7,"column":14},"end":{"row":7,"column":15},"action":"insert","lines":["S"],"id":17},{"start":{"row":7,"column":15},"end":{"row":7,"column":16},"action":"insert","lines":["t"]},{"start":{"row":7,"column":16},"end":{"row":7,"column":17},"action":"insert","lines":["r"]},{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"insert","lines":["i"]},{"start":{"row":7,"column":18},"end":{"row":7,"column":19},"action":"insert","lines":["n"]},{"start":{"row":7,"column":19},"end":{"row":7,"column":20},"action":"insert","lines":["g"]}],[{"start":{"row":7,"column":14},"end":{"row":7,"column":20},"action":"remove","lines":["String"],"id":18},{"start":{"row":7,"column":14},"end":{"row":7,"column":20},"action":"insert","lines":["String"]}],[{"start":{"row":8,"column":21},"end":{"row":8,"column":22},"action":"remove","lines":["\""],"id":19},{"start":{"row":8,"column":20},"end":{"row":8,"column":21},"action":"remove","lines":["e"]},{"start":{"row":8,"column":19},"end":{"row":8,"column":20},"action":"remove","lines":["c"]},{"start":{"row":8,"column":18},"end":{"row":8,"column":19},"action":"remove","lines":["i"]},{"start":{"row":8,"column":17},"end":{"row":8,"column":18},"action":"remove","lines":["r"]},{"start":{"row":8,"column":16},"end":{"row":8,"column":17},"action":"remove","lines":["P"]},{"start":{"row":8,"column":15},"end":{"row":8,"column":16},"action":"remove","lines":["\""]}],[{"start":{"row":8,"column":15},"end":{"row":8,"column":16},"action":"insert","lines":["N"],"id":20},{"start":{"row":8,"column":16},"end":{"row":8,"column":17},"action":"insert","lines":["u"]}],[{"start":{"row":8,"column":15},"end":{"row":8,"column":17},"action":"remove","lines":["Nu"],"id":21},{"start":{"row":8,"column":15},"end":{"row":8,"column":23},"action":"insert","lines":["Number()"]}],[{"start":{"row":8,"column":22},"end":{"row":8,"column":23},"action":"remove","lines":[")"],"id":22},{"start":{"row":8,"column":21},"end":{"row":8,"column":22},"action":"remove","lines":["("]}],[{"start":{"row":9,"column":23},"end":{"row":9,"column":24},"action":"remove","lines":["\""],"id":23},{"start":{"row":9,"column":22},"end":{"row":9,"column":23},"action":"remove","lines":["t"]},{"start":{"row":9,"column":21},"end":{"row":9,"column":22},"action":"remove","lines":["n"]},{"start":{"row":9,"column":20},"end":{"row":9,"column":21},"action":"remove","lines":["u"]},{"start":{"row":9,"column":19},"end":{"row":9,"column":20},"action":"remove","lines":["o"]},{"start":{"row":9,"column":18},"end":{"row":9,"column":19},"action":"remove","lines":["m"]},{"start":{"row":9,"column":17},"end":{"row":9,"column":18},"action":"remove","lines":["A"]},{"start":{"row":9,"column":16},"end":{"row":9,"column":17},"action":"remove","lines":["\""]}],[{"start":{"row":9,"column":16},"end":{"row":9,"column":17},"action":"insert","lines":["N"],"id":24},{"start":{"row":9,"column":17},"end":{"row":9,"column":18},"action":"insert","lines":["u"]},{"start":{"row":9,"column":18},"end":{"row":9,"column":19},"action":"insert","lines":["m"]},{"start":{"row":9,"column":19},"end":{"row":9,"column":20},"action":"insert","lines":["b"]},{"start":{"row":9,"column":20},"end":{"row":9,"column":21},"action":"insert","lines":["e"]},{"start":{"row":9,"column":21},"end":{"row":9,"column":22},"action":"insert","lines":["r"]}],[{"start":{"row":9,"column":16},"end":{"row":9,"column":22},"action":"remove","lines":["Number"],"id":25},{"start":{"row":9,"column":16},"end":{"row":9,"column":22},"action":"insert","lines":["Number"]}],[{"start":{"row":10,"column":21},"end":{"row":10,"column":22},"action":"remove","lines":["\""],"id":26},{"start":{"row":10,"column":20},"end":{"row":10,"column":21},"action":"remove","lines":["l"]},{"start":{"row":10,"column":19},"end":{"row":10,"column":20},"action":"remove","lines":["a"]},{"start":{"row":10,"column":18},"end":{"row":10,"column":19},"action":"remove","lines":["t"]},{"start":{"row":10,"column":17},"end":{"row":10,"column":18},"action":"remove","lines":["o"]},{"start":{"row":10,"column":16},"end":{"row":10,"column":17},"action":"remove","lines":["T"]},{"start":{"row":10,"column":15},"end":{"row":10,"column":16},"action":"remove","lines":["\""]}],[{"start":{"row":10,"column":15},"end":{"row":10,"column":16},"action":"insert","lines":["N"],"id":27},{"start":{"row":10,"column":16},"end":{"row":10,"column":17},"action":"insert","lines":["u"]},{"start":{"row":10,"column":17},"end":{"row":10,"column":18},"action":"insert","lines":["m"]},{"start":{"row":10,"column":18},"end":{"row":10,"column":19},"action":"insert","lines":["b"]},{"start":{"row":10,"column":19},"end":{"row":10,"column":20},"action":"insert","lines":["e"]},{"start":{"row":10,"column":20},"end":{"row":10,"column":21},"action":"insert","lines":["r"]}],[{"start":{"row":10,"column":15},"end":{"row":10,"column":21},"action":"remove","lines":["Number"],"id":28},{"start":{"row":10,"column":15},"end":{"row":10,"column":21},"action":"insert","lines":["Number"]}],[{"start":{"row":11,"column":17},"end":{"row":11,"column":18},"action":"remove","lines":["\""],"id":29},{"start":{"row":11,"column":16},"end":{"row":11,"column":17},"action":"remove","lines":["e"]},{"start":{"row":11,"column":15},"end":{"row":11,"column":16},"action":"remove","lines":["e"]},{"start":{"row":11,"column":14},"end":{"row":11,"column":15},"action":"remove","lines":["F"]},{"start":{"row":11,"column":13},"end":{"row":11,"column":14},"action":"remove","lines":["\""]}],[{"start":{"row":11,"column":13},"end":{"row":11,"column":14},"action":"insert","lines":["N"],"id":30},{"start":{"row":11,"column":14},"end":{"row":11,"column":15},"action":"insert","lines":["u"]},{"start":{"row":11,"column":15},"end":{"row":11,"column":16},"action":"insert","lines":["m"]},{"start":{"row":11,"column":16},"end":{"row":11,"column":17},"action":"insert","lines":["b"]},{"start":{"row":11,"column":17},"end":{"row":11,"column":18},"action":"insert","lines":["e"]},{"start":{"row":11,"column":18},"end":{"row":11,"column":19},"action":"insert","lines":["r"]}],[{"start":{"row":11,"column":13},"end":{"row":11,"column":19},"action":"remove","lines":["Number"],"id":31},{"start":{"row":11,"column":13},"end":{"row":11,"column":19},"action":"insert","lines":["Number"]}],[{"start":{"row":12,"column":27},"end":{"row":12,"column":28},"action":"remove","lines":["\""],"id":32},{"start":{"row":12,"column":26},"end":{"row":12,"column":27},"action":"remove","lines":["n"]},{"start":{"row":12,"column":25},"end":{"row":12,"column":26},"action":"remove","lines":["i"]},{"start":{"row":12,"column":24},"end":{"row":12,"column":25},"action":"remove","lines":["o"]},{"start":{"row":12,"column":23},"end":{"row":12,"column":24},"action":"remove","lines":["C"]},{"start":{"row":12,"column":22},"end":{"row":12,"column":23},"action":"remove","lines":[" "]},{"start":{"row":12,"column":21},"end":{"row":12,"column":22},"action":"remove","lines":["e"]},{"start":{"row":12,"column":20},"end":{"row":12,"column":21},"action":"remove","lines":["e"]},{"start":{"row":12,"column":19},"end":{"row":12,"column":20},"action":"remove","lines":["F"]},{"start":{"row":12,"column":18},"end":{"row":12,"column":19},"action":"remove","lines":["\""]}],[{"start":{"row":12,"column":18},"end":{"row":12,"column":19},"action":"insert","lines":["S"],"id":33},{"start":{"row":12,"column":19},"end":{"row":12,"column":20},"action":"insert","lines":["r"]}],[{"start":{"row":12,"column":19},"end":{"row":12,"column":20},"action":"remove","lines":["r"],"id":34}],[{"start":{"row":12,"column":19},"end":{"row":12,"column":20},"action":"insert","lines":["t"],"id":35},{"start":{"row":12,"column":20},"end":{"row":12,"column":21},"action":"insert","lines":["r"]},{"start":{"row":12,"column":21},"end":{"row":12,"column":22},"action":"insert","lines":["i"]},{"start":{"row":12,"column":22},"end":{"row":12,"column":23},"action":"insert","lines":["n"]}],[{"start":{"row":12,"column":18},"end":{"row":12,"column":23},"action":"remove","lines":["Strin"],"id":36},{"start":{"row":12,"column":18},"end":{"row":12,"column":26},"action":"insert","lines":["String()"]}],[{"start":{"row":12,"column":25},"end":{"row":12,"column":26},"action":"remove","lines":[")"],"id":37},{"start":{"row":12,"column":24},"end":{"row":12,"column":25},"action":"remove","lines":["("]}],[{"start":{"row":12,"column":15},"end":{"row":12,"column":16},"action":"remove","lines":["\""],"id":38}],[{"start":{"row":12,"column":6},"end":{"row":12,"column":7},"action":"remove","lines":["\""],"id":39}],[{"start":{"row":11,"column":6},"end":{"row":11,"column":7},"action":"remove","lines":["\""],"id":40}],[{"start":{"row":10,"column":6},"end":{"row":10,"column":7},"action":"remove","lines":["\""],"id":41}],[{"start":{"row":9,"column":6},"end":{"row":9,"column":7},"action":"remove","lines":["\""],"id":42}],[{"start":{"row":8,"column":6},"end":{"row":8,"column":7},"action":"remove","lines":["\""],"id":43}],[{"start":{"row":7,"column":6},"end":{"row":7,"column":7},"action":"remove","lines":["\""],"id":44}],[{"start":{"row":6,"column":6},"end":{"row":6,"column":7},"action":"remove","lines":["\""],"id":45}],[{"start":{"row":6,"column":12},"end":{"row":6,"column":13},"action":"remove","lines":["\""],"id":46}],[{"start":{"row":7,"column":10},"end":{"row":7,"column":11},"action":"remove","lines":["\""],"id":47}],[{"start":{"row":8,"column":11},"end":{"row":8,"column":12},"action":"remove","lines":["\""],"id":48}],[{"start":{"row":9,"column":12},"end":{"row":9,"column":13},"action":"remove","lines":["\""],"id":49}],[{"start":{"row":10,"column":11},"end":{"row":10,"column":12},"action":"remove","lines":["\""],"id":50}],[{"start":{"row":11,"column":9},"end":{"row":11,"column":10},"action":"remove","lines":["\""],"id":51}],[{"start":{"row":12,"column":9},"end":{"row":12,"column":10},"action":"remove","lines":[" "],"id":52}],[{"start":{"row":4,"column":0},"end":{"row":14,"column":3},"action":"remove","lines":["  {","      Date(UTC): Date,","      Market: String,","      Type: String,","      Price: Number,","      Amount: Number,","      Total: Number,","      Fee: Number,","      FeeCoin: String","  }","});"],"id":53}],[{"start":{"row":3,"column":4},"end":{"row":3,"column":8},"action":"remove","lines":["User"],"id":54},{"start":{"row":3,"column":4},"end":{"row":3,"column":5},"action":"insert","lines":["T"]},{"start":{"row":3,"column":5},"end":{"row":3,"column":6},"action":"insert","lines":["r"]},{"start":{"row":3,"column":6},"end":{"row":3,"column":7},"action":"insert","lines":["a"]},{"start":{"row":3,"column":7},"end":{"row":3,"column":8},"action":"insert","lines":["d"]},{"start":{"row":3,"column":8},"end":{"row":3,"column":9},"action":"insert","lines":["e"]},{"start":{"row":3,"column":9},"end":{"row":3,"column":10},"action":"insert","lines":["H"]},{"start":{"row":3,"column":10},"end":{"row":3,"column":11},"action":"insert","lines":["i"]},{"start":{"row":3,"column":11},"end":{"row":3,"column":12},"action":"insert","lines":["s"]},{"start":{"row":3,"column":12},"end":{"row":3,"column":13},"action":"insert","lines":["t"]},{"start":{"row":3,"column":13},"end":{"row":3,"column":14},"action":"insert","lines":["r"]},{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"insert","lines":["o"]},{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"insert","lines":["y"]}],[{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"remove","lines":["y"],"id":55},{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"remove","lines":["o"]},{"start":{"row":3,"column":13},"end":{"row":3,"column":14},"action":"remove","lines":["r"]}],[{"start":{"row":3,"column":13},"end":{"row":3,"column":14},"action":"insert","lines":["o"],"id":56},{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"insert","lines":["r"]},{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"insert","lines":["t"]},{"start":{"row":3,"column":16},"end":{"row":3,"column":17},"action":"insert","lines":["y"]}],[{"start":{"row":3,"column":16},"end":{"row":3,"column":17},"action":"remove","lines":["y"],"id":57},{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"remove","lines":["t"]}],[{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"insert","lines":["y"],"id":58}],[{"start":{"row":6,"column":7},"end":{"row":6,"column":8},"action":"remove","lines":["r"],"id":59},{"start":{"row":6,"column":6},"end":{"row":6,"column":7},"action":"remove","lines":["e"]},{"start":{"row":6,"column":5},"end":{"row":6,"column":6},"action":"remove","lines":["s"]},{"start":{"row":6,"column":4},"end":{"row":6,"column":5},"action":"remove","lines":["U"]}],[{"start":{"row":6,"column":4},"end":{"row":6,"column":5},"action":"insert","lines":["T"],"id":60},{"start":{"row":6,"column":5},"end":{"row":6,"column":6},"action":"insert","lines":["r"]},{"start":{"row":6,"column":6},"end":{"row":6,"column":7},"action":"insert","lines":["a"]},{"start":{"row":6,"column":7},"end":{"row":6,"column":8},"action":"insert","lines":["d"]},{"start":{"row":6,"column":8},"end":{"row":6,"column":9},"action":"insert","lines":["e"]}],[{"start":{"row":6,"column":9},"end":{"row":6,"column":10},"action":"insert","lines":["H"],"id":61},{"start":{"row":6,"column":10},"end":{"row":6,"column":11},"action":"insert","lines":["i"]},{"start":{"row":6,"column":11},"end":{"row":6,"column":12},"action":"insert","lines":["s"]},{"start":{"row":6,"column":12},"end":{"row":6,"column":13},"action":"insert","lines":["t"]},{"start":{"row":6,"column":13},"end":{"row":6,"column":14},"action":"insert","lines":["o"]},{"start":{"row":6,"column":14},"end":{"row":6,"column":15},"action":"insert","lines":["r"]},{"start":{"row":6,"column":15},"end":{"row":6,"column":16},"action":"insert","lines":["y"]}],[{"start":{"row":6,"column":38},"end":{"row":6,"column":39},"action":"remove","lines":["r"],"id":62},{"start":{"row":6,"column":37},"end":{"row":6,"column":38},"action":"remove","lines":["e"]},{"start":{"row":6,"column":36},"end":{"row":6,"column":37},"action":"remove","lines":["s"]},{"start":{"row":6,"column":35},"end":{"row":6,"column":36},"action":"remove","lines":["U"]}],[{"start":{"row":6,"column":35},"end":{"row":6,"column":36},"action":"insert","lines":["T"],"id":63},{"start":{"row":6,"column":36},"end":{"row":6,"column":37},"action":"insert","lines":["r"]}],[{"start":{"row":6,"column":35},"end":{"row":6,"column":37},"action":"remove","lines":["Tr"],"id":64},{"start":{"row":6,"column":35},"end":{"row":6,"column":47},"action":"insert","lines":["TradeHistory"]}],[{"start":{"row":6,"column":53},"end":{"row":6,"column":54},"action":"remove","lines":["r"],"id":65},{"start":{"row":6,"column":52},"end":{"row":6,"column":53},"action":"remove","lines":["e"]},{"start":{"row":6,"column":51},"end":{"row":6,"column":52},"action":"remove","lines":["s"]},{"start":{"row":6,"column":50},"end":{"row":6,"column":51},"action":"remove","lines":["U"]}],[{"start":{"row":6,"column":50},"end":{"row":6,"column":51},"action":"insert","lines":["T"],"id":69}],[{"start":{"row":6,"column":50},"end":{"row":6,"column":57},"action":"remove","lines":["TSchema"],"id":70},{"start":{"row":6,"column":50},"end":{"row":6,"column":68},"action":"insert","lines":["TradeHistorySchema"]}],[{"start":{"row":7,"column":20},"end":{"row":7,"column":21},"action":"remove","lines":["r"],"id":71},{"start":{"row":7,"column":19},"end":{"row":7,"column":20},"action":"remove","lines":["e"]},{"start":{"row":7,"column":18},"end":{"row":7,"column":19},"action":"remove","lines":["s"]},{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"remove","lines":["U"]}],[{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"insert","lines":["T"],"id":72}],[{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"remove","lines":["T"],"id":73},{"start":{"row":7,"column":17},"end":{"row":7,"column":29},"action":"insert","lines":["TradeHistory"]}],[{"start":{"row":5,"column":0},"end":{"row":6,"column":0},"action":"insert","lines":["",""],"id":74}],[{"start":{"row":6,"column":0},"end":{"row":7,"column":0},"action":"insert","lines":["",""],"id":75}],[{"start":{"row":6,"column":0},"end":{"row":6,"column":1},"action":"insert","lines":["}"],"id":76},{"start":{"row":6,"column":1},"end":{"row":6,"column":2},"action":"insert","lines":[")"]},{"start":{"row":6,"column":2},"end":{"row":6,"column":3},"action":"insert","lines":[";"]}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":39},"action":"remove","lines":["const validator = require('validator');"],"id":77},{"start":{"row":0,"column":37},"end":{"row":1,"column":0},"action":"remove","lines":["",""]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":0},"end":{"row":9,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1544502559830,"hash":"bbb7ba3818802bf0e3fdc0a38651ff7e4f18d579"}