var db = require('../models');

function create(req, res) {
  newStory=req.body;

  db.Story.create(newStory, function (err, newStory) {
    /* TODO: consider adding a log out of the err as well -jc */
    if (err) {res.sendStatus(404);}
    res.json(newStory);
  });
}

function index(req, res) {
  db.Story.find({})
    .populate('username')
    .populate('clinic')
    .exec(function(err, storys) {
      /* TODO: consider adding a log out of the err as well -jc */
        if (err) { res.sendStatus(404); }
        res.json(storys);
    });
}

function show(req, res) {
  /* TODO: consider extracting req.params.storyId to a variable then passing it in to your db call for code cleanliness -jc */
  db.Story.findById(req.params.storyId)
  .populate('username')
  .populate('clinic')
    .exec(function(err, story) {
      /* TODO: consider adding a log out of the err as well -jc */
        if (err) { res.sendStatus(404); }
        res.json(story);
    });
}

function destroy(req, res) {
  /* TODO: consider extracting req.params.storyId to a variable then passing it in to your db call for code cleanliness -jc */
  db.Story.findOneAndRemove({_id: req.params.storyId})
  .populate('username')
  .populate('clinic')
    .exec(function(err, story){
      /* TODO: consider adding a log out of the err as well -jc */
		if (err) {
			res.sendStatus(404);
		}
		res.json(story);
	});
}

function update(req, res) {
  /* TODO: consider extracting req.params.storyId to a variable then passing it in to your db call for code cleanliness -jc */
  db.Story.findByIdAndUpdate(req.params.storyId, req.body, {new: true})
  .populate('username')
  .populate('clinic')
  .exec(function(err, story) {
    /* TODO: consider adding a log out of the err as well -jc */
  if (err) {
		res.sendStatus(404);
		}
		res.json(story);
	});
}



// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
};
