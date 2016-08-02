/************
 * DATABASE *
 ************/

var db = require('../models');

function findNearest(req, res, next) {
    // limit or 3
    /* Nice short circuiting! */
    var limit = req.query.limit || 3;

    // max distance or 100 miles
    /* Nice short circuiting! */
    var maxDistance = req.query.distance || 1000;

    //convert to radians by dividing by the radius of the earth
    maxDistance /= 6371;

    // get latLng
    var coords = [];
    coords[0] = req.query.longitude || 0;
    coords[1] = req.query.latitude || 0;

    // find a location
    db.Clinic.find({
      loc: {
        $near: coords,
      }
    }).limit(limit).exec(function(err, locations) {
      if (err) {
        /* TODO: consider adding a log out of the err as well -jc */
        return res.sendStatus(500);
      }
      res.json(locations);
    });
  }


function create(req, res) {
  var newClinic = req.body;
  var loc = [req.body.latitude, req.body.longitude];
  newClinic.loc = loc;
  db.Clinic.create(newClinic, function (err, clinicThing) {
    /* TODO: consider adding a log out of the err as well -jc */
    if (err) {res.sendStatus(404);}

    res.json(clinicThing);
  });
}

function index(req, res) {
  /* TODO: please remove commented code from  -jc */
  // if (req.user!=="admin") {
  //  return res.sendStatus(401);
  // }
  db.Clinic.find({})
    .exec(function(err, clinics) {
      /* TODO: consider adding a log out of the err as well -jc */
        if (err) { res.sendStatus(404); }
        res.json(clinics);
    });
}

function show(req, res) {
  /* TODO: consider extracting req.params.clinicId to a variable then passing it in to your db call for code cleanliness -jc */
  db.Clinic.findById(req.params.clinicId)
    .exec(function(err, clinic) {
      /* TODO: consider adding a log out of the err as well -jc */
        if (err) { res.sendStatus(404); }
        res.json(clinic);
    });
}


function destroy(req, res) {
  db.Clinic.findOneAndRemove({_id: req.params.clinicId})
    .exec(function(err, clinic){
    /* TODO: consider adding a log out of the err as well -jc */
    if (err) {
			res.sendStatus(404);
		}
		res.json(clinic);
	});
}

function update(req, res) {
  db.Clinic.findByIdAndUpdate(req.params.clinicId, req.body, {new: true}, function(err, clinic) {
    /* TODO: consider adding a log out of the err as well -jc */
    /* TODO: check indentation -jc */
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
