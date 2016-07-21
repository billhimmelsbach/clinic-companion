/************
 * DATABASE *
 ************/
var db = require('../models');
/* hard-coded data */

// GET /api/albums
function index(req, res) {
  db.Album.find({}, function(err, albums) {
    if (err) {
      res.send(404);
      return;
    }
    res.json(albums);
  });
}


function create(req, res) {
  console.log("!!!!" +req.body.genres);
  var genresSplit = req.body.genres.split(',');
  var genresCut = genres.map(function(item) {
    return item.trim();
  });
  req.body.genres = genresCut;
  console.log(genresCut);
db.Album.create(req.body, function(err, newAlbum) {
  if (err) {
    res.send(404);
    return;
  }
  res.json(newAlbum);
});
}
	// newAlbum.save(function(err, savedAlbum) {
	// 	if (err) {
	// 		res.sendStatus(404);
	// 	}
	// 	res.json(savedAlbum);
	// });

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
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
