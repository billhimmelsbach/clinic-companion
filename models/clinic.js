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
		/* TODO: neat trick: the ObjectId for a db entry is actually a highly obfuscated time stamp!
	  try this:
	    function dateFromObjectId (objectId) {
	      return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
	    };
	   - jc
	   */
    date_posted: String,
		letter_designation: String
});

var Clinic = mongoose.model('Clinic', ClinicSchema);
module.exports = Clinic;
