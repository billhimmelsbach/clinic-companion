/************
 * DATABASE *
 ************/

var db = require('../models');

function create(req, res) {
  var newClinic = req.body;
  db.Clinic.create(newClinic, function (err, newClinic) {
    if (err) {res.sendStatus(404);}
    res.json(newClinic);
  });
}

// function create(req, res) {
//   console.log('body', req.body);
//
// // TODO
// // FIX THIS BIZ
// // TODO
//   // split at comma and remove and trailing space
//   // genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
//   // req.body.genres = genres;
//   // console.log(genres);
//
// // var cleanGenres = req.body.genres.split(',');
// // cleanGenres = cleanGenres.map(function (word) {
// //   return word.trim();
// // });
// var newAlbum = req.body;
// newAlbum.genres = cleanGenres;
//   db.Album.create(newAlbum, function(err, album) {
//     if (err) { console.log('error', err); }
//     console.log(album);
//     res.json(album);
//   });
// }

function index(req, res) {
  db.Clinic.find({})
    // .populate('location')
    .exec(function(err, clinics) {
        if (err) { res.sendStatus(404); }
        res.json(clinics);
    });
}

function show(req, res) {
  db.Clinic.findById(req.params.clinicId)
    // .populate('location')
    .exec(function(err, clinic) {
        if (err) { res.sendStatus(404); }
        res.json(clinic);
    });
}


function destroy(req, res) {
  db.Clinic.findOneAndRemove({_id: req.params.clinicId})
    // .populate('location')
    .exec(function(err, clinic){
		if (err) {
			res.sendStatus(404);
		}
		res.json(clinic);
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
  // update: update
};
