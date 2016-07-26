var mongoose = require('mongoose'),
Schema = mongoose.Schema;

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
    	type: [Number],
    	index: '2d'
		},
    image: String,
    date_posted: String,
		letter_designation: String
});

var Clinic = mongoose.model('Clinic', ClinicSchema);
module.exports = Clinic;
