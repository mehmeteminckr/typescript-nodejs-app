export {}
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
  email: String,
  password: String,
  date: Date,
});


module.exports= mongoose.model('UserModel',UserModelSchema);