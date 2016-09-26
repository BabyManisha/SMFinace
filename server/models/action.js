var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var actionSchema = mongoose.Schema({
   username: String,
   type: String,
   amount: String,
   tag: String,
   discript: String,
   account: String,
   date: String,
   active: String
});

module.exports = mongoose.model('Action', actionSchema);