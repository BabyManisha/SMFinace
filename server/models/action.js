var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var actionSchema = mongoose.Schema({
   username: String,
   type: String,
   amount: String, //number
   tag: String,
   discript: String,
   account: String,
   date: String,  //date
   active: String //boolean
});

module.exports = mongoose.model('Action', actionSchema);