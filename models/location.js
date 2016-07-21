var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  address: String,
  location: String,
  // clinic: Reference

});

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
