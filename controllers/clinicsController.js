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
  update: update
};
