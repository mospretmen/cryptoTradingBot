const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Data15Schema = new Schema({
  
  data: []
  
});


// Export the model
module.exports = mongoose.model('Data15', Data15Schema);