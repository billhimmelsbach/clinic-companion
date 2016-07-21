var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Location = require('./location');

var ClinicSchema = new Schema({
    _id: String,
	  name: String,
	  address : String,
    phone_number: String,
    costs: String,
    email: String,
    social_media: String,
    stories: {type: Schema.Types.ObjectId, ref: 'Story'},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: String,
    date_posted: String,
});

var Clinic = mongoose.model('Clinic', ClinicSchema);
module.exports = Clinic;
