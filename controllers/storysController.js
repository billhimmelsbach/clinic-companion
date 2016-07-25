/************
 * DATABASE *
 ************/

var db = require('../models');

function create(req, res) {
  var newStory = req.body;
  db.Story.create(newStory, function (err, newStory) {
    if (err) {res.sendStatus(404);}
    res.json(newStory);
    return;
  });
}

function index(req, res) {
  // if (req.user!=="admin") {
  //  return res.sendStatus(401);
  // }
  db.Story.find({})
    .populate('username')
    .populate('clinic')
    .exec(function(err, storys) {
        if (err) { res.sendStatus(404); }
        console.log(storys);
        res.json(storys);
        return;
    });
}

function show(req, res) {
  db.Story.findById(req.params.storyId)
  .populate('username')
  .populate('clinic')
    .exec(function(err, story) {
        if (err) { res.sendStatus(404); }
        res.json(story);
        return;
    });
}


function destroy(req, res) {
  db.Story.findOneAndRemove({_id: req.params.storyId})
  .populate('username')
  .populate('clinic')
    .exec(function(err, story){
		if (err) {
			res.sendStatus(404);
		}
		res.json(story);
    return;
	});
}

function update(req, res) {
  db.Story.findByIdAndUpdate(req.params.storyId, req.body, {new: true})
  .populate('username')
  .populate('clinic')
  .exec(function(err, story) {
  if (err) {
		res.sendStatus(404);
		}
		res.json(story);
    return;
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
