var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var StorySchema = new Schema({
	  story_content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date_posted: String,
});

var Story = mongoose.model('Story', StorySchema);
module.exports = Story;
