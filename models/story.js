var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var StorySchema = new Schema({
	  story_content: String,
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    clinic: {
      type: Schema.Types.ObjectId,
      ref: 'Clinic'
    },
    date_posted: String,
});

var Story = mongoose.model('Story', StorySchema);
module.exports = Story;
