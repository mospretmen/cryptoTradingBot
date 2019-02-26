const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DataSchema = new Schema({
  
  time: Number,
  open: String,
  high: String,
  low: String,
  close: String,
  closeTime: Number,
  assetVolume: String,
  trades: Number,
  buyBaseVolume: String,
  buyAssetVolume: String
  
});


// Export the model
module.exports = mongoose.model('Data', DataSchema);