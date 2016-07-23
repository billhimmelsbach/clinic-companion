// /************
//  * DATABASE *
//  ************/
//
// var db = require('../models');
//
// function findNearest(req, res, next) {
//     var limit = req.query.limit || 10;
//
//     // get the max distance or set it to 8 kilometers
//     var maxDistance = req.query.distance || 8;
//
//     // we need to convert the distance to radians
//     // the raduis of Earth is approximately 6371 kilometers
//     maxDistance /= 6371;
//
//     // get coordinates [ <longitude> , <latitude> ]
//     var coords = [];
//     coords[0] = req.query.long || 0;
//     coords[1] = req.query.lat || 0;
//
//     // find a location
//     Location.find({
//       loc: {
//         $near: coords,
//         $maxDistance: maxDistance
//       }
//     }).limit(limit).exec(function(err, locations) {
//       if (err) {
//         return res.json(500, err);
//       }
//
//       res.json(200, locations);
//     });
//   }
//
//
// function create(req, res) {
//   var newLocation = req.body;
//   db.Location.create(newLocation, function (err, newLocation) {
//     if (err) {res.sendStatus(404);}
//     res.json(newLocation);
//   });
// }
//
// function index(req, res) {
//   // if (req.user!=="admin") {
//   //  return res.sendStatus(401);
//   // }
//   db.Location.find({})
//     // .populate('location')
//     .exec(function(err, locations) {
//         if (err) { res.sendStatus(404); }
//         res.json(locations);
//     });
// }
//
// function show(req, res) {
//   db.Location.findById(req.params.locationId)
//     // .populate('location')
//     .exec(function(err, location) {
//         if (err) { res.sendStatus(404); }
//         res.json(location);
//     });
// }
//
//
// function destroy(req, res) {
//   db.Location.findOneAndRemove({_id: req.params.locationId})
//     // .populate('location')
//     .exec(function(err, location){
// 		if (err) {
// 			res.sendStatus(404);
// 		}
// 		res.json(location);
// 	});
// }
//
// function update(req, res) {
//   db.Location.findByIdAndUpdate(req.params.locationId, req.body, {new: true}, function(err, location) {
//   if (err) {
// 		res.sendStatus(404);
// 		}
// 		res.json(location);
// 	});
// }
//
//
//
// // export public methods here
// module.exports = {
//   index: index,
//   create: create,
//   show: show,
//   destroy: destroy,
//   update: update,
//   findNearest: findNearest
//
// };
