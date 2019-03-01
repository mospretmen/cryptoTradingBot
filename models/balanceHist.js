const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BalanceHistSchema = new Schema({
  
  date: String,
  totalETHBalance: Number,
  totalETHInvested: Number
  
});


// Export the model
module.exports = mongoose.model('BalanceHist', BalanceHistSchema);    