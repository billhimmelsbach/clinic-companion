var mongoose = require('mongoose'),
Schema = mongoose.Schema;
  // Location = require('./location');

var ClinicSchema = new Schema({
	  name: String,
	  address1: String,
    address2: String,
    address3: String,
    city: String,
    state: String,
    zipcode: String,
    phone_number: String,
    costs: String,
    email: String,
    website: String,
    book_appointment: String,
    social_media: String,
    // stories: {type: Schema.Types.ObjectId, ref: 'Story'},
    // location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: String,
    date_posted: String,
});

var Clinic = mongoose.model('Clinic', ClinicSchema);
module.exports = Clinic;
