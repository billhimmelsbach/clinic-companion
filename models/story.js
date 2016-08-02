var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var StorySchema = new Schema({
	  story_content: String,
		/* TODO: Consider setting this key name to _user as it is a foreign key. -jc */
		username: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
		/* TODO: Consider setting this key name to _clinic as it is a foreign key. -jc */
    clinic: {
      type: Schema.Types.ObjectId,
      ref: 'Clinic'
    },
		/* TODO: neat trick: the ObjectId for a db entry is actually a highly obfuscated time stamp!
		try this:
			function dateFromObjectId (objectId) {
				return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
			};
		 - jc
		 */
    date_posted: String,
		/* TODO: Since you are referencing a clinic in your model, you don't need the clinic name as a separate key -jc*/
    clinicName: String
});

var Story = mongoose.model('Story', StorySchema);
module.exports = Story;
