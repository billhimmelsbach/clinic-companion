var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: String,
  /* TODO: salt and hash are an abstraction of passport.js and don't need tobe instantiated by the developer -jc */
  salt: String,
  hash: String,
  /* TODO: neat trick: the ObjectId for a db entry is actually a highly obfuscated time stamp!
  try this:
    function dateFromObjectId (objectId) {
      return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };
   - jc
   */
  date_created: String,
  admin:Boolean
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;
