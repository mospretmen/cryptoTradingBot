const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Data15mSchema = new Schema({
  
  date: String,
  time: String,
  closeTime: String,
  open: String,
  high: String,
  low: String,
  close: String,
  assetVolume: String,
  trades: Number,
  buyBaseVolume: String,
  buyAssetVolume: String
  
  
});


// Export the model
module.exports = mongoose.model('Data15m', Data15mSchema);    