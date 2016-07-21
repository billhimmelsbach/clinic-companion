/************
 * DATABASE *
 ************/

var db = require('../models');



// GET /api/albums
function index(req, res) {
  db.Album.find({}, function(err, allAlbums) {
    res.json(allAlbums);
  });
}

function create(req, res) {
  console.log('body', req.body);

// TODO
// FIX THIS BIZ
// TODO
  // split at comma and remove and trailing space
  // genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  // req.body.genres = genres;
  // console.log(genres);

// var cleanGenres = req.body.genres.split(',');
// cleanGenres = cleanGenres.map(function (word) {
//   return word.trim();
// });
var newAlbum = req.body;
newAlbum.genres = cleanGenres;
  db.Album.create(newAlbum, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });
}

function show(req, res) {
  app.get('/api/clinics', function (req, res) {
    // send all clinics as JSON response
    db.Clinic.find().populate('location')
      .exec(function(err, clinics) {
        if (err) { return console.log("index error: " + err); }
        res.json(clinics);
    });
  });
}

function destroy(req, res) {
  db.Album.findOneAndRemove(req.params.albumId, function(err, album) {
		if (err) {
			res.sendStatus(404);
		}
		res.json(album);
	});
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
