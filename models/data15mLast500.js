const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Data15mLast500Schema = new Schema({
  
  data: []
  
});


// Export the model
module.exports = mongoose.model('Data15mLast500Schema', Data15mLast500Schema);