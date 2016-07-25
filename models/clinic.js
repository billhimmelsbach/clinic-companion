var mongoose = require('mongoose'),
Schema = mongoose.Schema;
  // Location = require('./location');

//TODO
//check on if a data base entry has not been updated
//TODO

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
		loc: {
    	type: [Number],  //long, lat
    	index: '2d'
		},
    stories: {type: Schema.Types.ObjectId, ref: 'Story'},
    // location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: String,
    date_posted: String,
		letter_designation: String
});

var Clinic = mongoose.model('Clinic', ClinicSchema);
module.exports = Clinic;
