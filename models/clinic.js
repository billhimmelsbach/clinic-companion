var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Location = require('./location');

var CharacterSchema = new Schema({
  name: String
});

var ClinicSchema = new Schema({
     title: String,
     location: {type: Schema.Types.ObjectId, ref: 'Location'},
     image: String,
     releaseDate: String,
     characters: [CharacterSchema]
});

var Clinic = mongoose.model('Clinic', ClinicSchema);
module.exports = Clinic;
