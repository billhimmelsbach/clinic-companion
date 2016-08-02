var db = require('../models');

function create(req, res) {
  var storyData = {
    story_content: req.body.story_content
  };
  var clinicId = req.params.clinicId;
  db.Story.create(storyData, function (err, createdStory) {
    /* TODO: consider adding a log out of the err as well -jc */
    if (err) {res.sendStatus(404);}

    db.Clinic.findById(clinicId, function (err, clinicFound) {
    /* TODO: check indentation -jc */
    createdStory.clinic = clinicFound;
    createdStory.save(function (err, finalStory) {
      /* TODO: consider adding a log out of the err as well -jc */
      if (err) {res.sendStatus(404);}
      res.json(finalStory);
        });
    });
  });
}

function index(req, res) {
  var storyList=[];
  db.Story.find({})
    .populate('username')
    .populate('clinic')
    .exec(function(err, foundStorys) {
      /* TODO: consider adding a log out of the err as well -jc */
        if (err) { res.sendStatus(404); }
        /* TODO: the below code block can be achieved with a .filter method instead. This reduces the need for instantiating a storyList variable outside of the call. -jc */
        foundStorys.forEach(function(storySearch) {
          var test = storySearch.clinic._id;
          if (test == req.params.clinicId) {
            storyList.push(storySearch);
          }
          /* TODO: check indentation -jc */
          });
          res.json(storyList);
      });
    }


// export public methods here
module.exports = {
  index: index,
  create: create,
};
