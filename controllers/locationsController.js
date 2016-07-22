// /************
//  * DATABASE *
//  ************/
//
// var db = require('../models');
//
//
//
// // GET /api/songs
// function index(req, res) {
//   db.Song.find({}, function(err, allSongs) {
//     res.json(allSongs);
//   });
// }
//
//
// //create
// function create(req, res) {
//   console.log("HAAAALP");
//   // console.log(newSong);
//   var albumId = req.params.albumId;
//   var songInfo= req.body;
//   console.log(albumId);
//   console.log(songInfo);
//   db.Song.create(songInfo, function(err, songReturn) {
//     if (err) { console.log('error', err); }
//     console.log(songReturn);
//   db.Album.findById(albumId, function(err, albumReturn) {
// 		if (err) {
// 			res.sendStatus(404);
// 		}
//   console.log(albumReturn);
//   console.log(songReturn);
//   albumReturn.songs.push(songReturn);
//   console.log(albumReturn);
//   console.log(songReturn);
//   albumReturn.save(function(err, finalAlbum) {
//     if (err) {
//       res.sendStatus(404);
//     }
//   res.json(songReturn);
//   });
// 	});
//     });
// }
//
// function show(req, res) {
//   // FILL ME IN !
// }
//
// function destroy(req, res) {
//   // FILL ME IN !
// }
//
// function update(req, res) {
//   // FILL ME IN !
// }
//
//
// // export public methods here
// module.exports = {
//   index: index,
//   create: create,
//   show: show,
//   destroy: destroy,
//   update: update
// };
