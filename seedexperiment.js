db.Clinic.findOne({username: storyData.username}, function (err, foundUser) {
  console.log('found user ' + foundUser.username + ' for story ' + storyData.username);
  if (err) {
    console.log(err);
    return;
  }
  story.username = foundUser;
  story.save(function(err, savedStory){
    if (err) {
      return console.log(err);
    }
    console.log('saved ' + savedStory.username + ' by ' + foundUser.username);
  });
});
