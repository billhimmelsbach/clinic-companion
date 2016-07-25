// server.js
// SERVER-SIDE JAVASCRIPT

//TODO
//changing between signup and signin without page changes
//one admin, or one boolean
//prevent idential usernames?

//set a variable that is equal to the window.user
//put a hidden input tag that adds the current user into the post
//when I do the get, only show those posts
//also, per clinic, another hidden input button that is set to the clinic itself
//filter by that as well
//your id is user._id
//{{#if admin}} show the buttons, else do note
//{{if user}} then show normal page {{else}} show login
//
//ADJUST MAP FOR NEW MARKERS ZOOM


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
bodyParser = require('body-parser'),
moment = require('moment'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

// connect to db models
var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));


// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

moment().format();

app.set('view engine', 'hbs');
// app.set('view engine', 'html');

var controllers = require('./controllers');

app.use(cookieParser());
app.use(session({
  secret: 'strongenoughtobearthechildrenthengetbacktobusiness1',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var db = require("./models"),
    Post = db.Post,
    User = db.User;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//AUTH ROUTES
// show signup view

app.get('/', function (req, res) {
    res.render('index', {user: JSON.stringify(req.user) + " || null"});
});

app.get('/signup', function (req, res) {
  res.render('signup'); // you can also use res.sendFile
});


// show login view
app.get('/login', function (req, res) {
  res.render('login'); // you can also use res.sendFile
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  console.log('logged in!!!'); // sanity check
  res.redirect('/'); // preferred!
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});


// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        console.log("user signed up!");
        res.redirect('/');
      });
    }
  );
});
////////////////////
//  ROUTES
///////////////////
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', controllers.api.index);
app.get('/api/clinics', controllers.clinics.index);
app.get('/api/clinics/:clinicId', controllers.clinics.show);
app.put('/api/clinics/:clinicId', controllers.clinics.update);
// app.get('/api/albums/:albumId/songs', controllers.songs.show);
app.post('/api/clinics', controllers.clinics.create);
// app.post('/api/albums/:albumId/songs', controllers.songs.create);
app.delete('/api/clinics/:clinicId', controllers.clinics.destroy);
app.get('/api/storys', controllers.storys.index);
app.get('/api/storys/:storyId', controllers.storys.show);
app.put('/api/storys/:storyId', controllers.storys.update);
// app.get('/api/albums/:albumId/songs', controllers.songs.show);
app.post('/api/storys', controllers.storys.create);
// app.post('/api/albums/:albumId/songs', controllers.songs.create);
app.delete('/api/storys/:storyId', controllers.storys.destroy);
app.get('/api/clinics/:clinicId/storys', controllers.clinicsStorys.index);
app.get('/api/locations/', controllers.clinics.findNearest);


//
// // define a root route: localhost:3000/
// app.get('/', function (req, res) {
//   res.sendFile('views/index.html' , { root : __dirname});
// });
//
// // get all clinics
// app.get('/api/clinics', function (req, res) {
//   // send all clinics as JSON response
//   db.Clinic.find().populate('location')
//     .exec(function(err, clinics) {
//       if (err) { return console.log("index error: " + err); }
//       res.json(clinics);
//   });
// });
//
// // get one clinic
// app.get('/api/clinics/:id', function (req, res) {
//   db.Clinic.findOne({_id: req.params.id }, function(err, data) {
//     res.json(data);
//   });
// });
//
// // create new clinic
// app.post('/api/clinics', function (req, res) {
//   // create new clinic with form data (`req.body`)
//   var newClinic = new db.Clinic({
//     title: req.body.title,
//     image: req.body.image,
//     releaseDate: req.body.releaseDate,
//   });
//   // find the location from req.body
//   db.Location.findOne({name: req.body.location}, function(err, location){
//     if (err) {
//       return console.log(err);
//     }
//     // add this location to the clinic
//     newClinic.location = location;
//
//
//     // save newClinic to database
//     newClinic.save(function(err, clinic){
//       if (err) {
//         return console.log("save error: " + err);
//       }
//       console.log("saved ", clinic.title);
//       // send back the clinic!
//       res.json(clinic);
//     });
//   });
// });
//
// // delete clinic
// app.delete('/api/clinics/:id', function (req, res) {
//   // get clinic id from url params (`req.params`)
//   console.log('clinics delete', req.params);
//   var clinicId = req.params.id;
//   // find the index of the clinic we want to remove
//   db.Clinic.findOneAndRemove({ _id: clinicId })
//     .populate('location')
//     .exec(function (err, deletedClinic) {
//     res.json(deletedClinic);
//   });
// });
//
//
// // Create a character associated with a clinic
// app.post('/api/clinics/:clinic_id/characters', function (req, res) {
//   // Get clinic id from url params (`req.params`)
//   var clinicId = req.params.clinic_id;
//   db.Clinic.findById(clinicId)
//     .populate('location')
//     .exec(function(err, foundClinic) {
//       console.log(foundClinic);
//       if (err) {
//         res.status(500).json({error: err.message});
//       } else if (foundClinic === null) {
//         // Is this the same as checking if the foundClinic is undefined?
//         res.status(404).json({error: "No Clinic found by this ID"});
//       } else {
//         // push character into characters array
//         foundClinic.characters.push(req.body);
//         // save the clinic with the new character
//         foundClinic.save();
//         res.status(201).json(foundClinic);
//       }
//     });
// });
//
//
// // Delete a character associated with a clinic
// app.delete('/api/clinics/:clinic_id/characters/:character_id', function (req, res) {
//   // Get clinic id from url params (`req.params`)
//   var clinicId = req.params.clinic_id;
//   var characterId = req.params.character_id;
//   db.Clinic.findById(clinicId)
//     .populate('location')
//     .exec(function(err, foundClinic) {
//       if (err) {
//         res.status(500).json({error: err.message});
//       } else if (foundClinic === null) {
//         res.status(404).json({error: "No Clinic found by this ID"});
//       } else {
//         // find the character by id
//         var deletedCharacter = foundClinic.characters.id(characterId);
//         // delete the found character
//         deletedCharacter.remove();
//         // save the found clinic with the character deleted
//         foundClinic.save();
//         // send back the found clinic without the character
//         res.json(foundClinic);
//       }
//     });
// });
//
//
//
app.listen(process.env.PORT || 3000, function () {
  console.log('Clinic Companion listening at http://localhost:3000/');
});
