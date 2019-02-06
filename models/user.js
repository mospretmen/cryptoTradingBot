const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email' 
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
