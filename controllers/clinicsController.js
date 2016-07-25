/************
 * DATABASE *
 ************/

var db = require('../models');

function findNearest(req, res, next) {
    var limit = req.query.limit || 10;

    // get the max distance or set it to 1000 kilometers
    var maxDistance = req.query.distance || 1000;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude || 0;
    coords[1] = req.query.latitude || 0;

    // find a location
    db.Clinic.find({
      loc: {
        $near: coords,
        // $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, locations) {
      if (err) {
        return res.sendStatus(500);
      }

      res.json(locations);
    });
  }


function create(req, res) {
  var newClinic = req.body;
  console.log(newClinic);
  console.log("FIRE!");
  console.log(req.body);
  var loc = [req.body.latitude, req.body.longitude];
  newClinic.loc = loc;
  db.Clinic.create(newClinic, function (err, clinicThing) {
    if (err) {res.sendStatus(404);}

    res.json(clinicThing);
  });
}

function index(req, res) {
  // if (req.user!=="admin") {
  //  return res.sendStatus(401);
  // }
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
  db.Clinic.findByIdAndUpdate(req.params.clinicId, req.body, {new: true}, function(err, clinic) {
  if (err) {
		res.sendStatus(404);
		}
		res.json(clinic);
	});
}



// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
  findNearest: findNearest

};
