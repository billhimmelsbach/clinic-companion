// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// connect to db models
var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all clinics
app.get('/api/clinics', function (req, res) {
  // send all clinics as JSON response
  db.Clinic.find().populate('location')
    .exec(function(err, clinics) {
      if (err) { return console.log("index error: " + err); }
      res.json(clinics);
  });
});

// get one clinic
app.get('/api/clinics/:id', function (req, res) {
  db.Clinic.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
});

// create new clinic
app.post('/api/clinics', function (req, res) {
  // create new clinic with form data (`req.body`)
  var newClinic = new db.Clinic({
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });
  // find the location from req.body
  db.Location.findOne({name: req.body.location}, function(err, location){
    if (err) {
      return console.log(err);
    }
    // add this location to the clinic
    newClinic.location = location;


    // save newClinic to database
    newClinic.save(function(err, clinic){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", clinic.title);
      // send back the clinic!
      res.json(clinic);
    });
  });
});

// delete clinic
app.delete('/api/clinics/:id', function (req, res) {
  // get clinic id from url params (`req.params`)
  console.log('clinics delete', req.params);
  var clinicId = req.params.id;
  // find the index of the clinic we want to remove
  db.Clinic.findOneAndRemove({ _id: clinicId })
    .populate('location')
    .exec(function (err, deletedClinic) {
    res.json(deletedClinic);
  });
});


// Create a character associated with a clinic
app.post('/api/clinics/:clinic_id/characters', function (req, res) {
  // Get clinic id from url params (`req.params`)
  var clinicId = req.params.clinic_id;
  db.Clinic.findById(clinicId)
    .populate('location')
    .exec(function(err, foundClinic) {
      console.log(foundClinic);
      if (err) {
        res.status(500).json({error: err.message});
      } else if (foundClinic === null) {
        // Is this the same as checking if the foundClinic is undefined?
        res.status(404).json({error: "No Clinic found by this ID"});
      } else {
        // push character into characters array
        foundClinic.characters.push(req.body);
        // save the clinic with the new character
        foundClinic.save();
        res.status(201).json(foundClinic);
      }
    });
});


// Delete a character associated with a clinic
app.delete('/api/clinics/:clinic_id/characters/:character_id', function (req, res) {
  // Get clinic id from url params (`req.params`)
  var clinicId = req.params.clinic_id;
  var characterId = req.params.character_id;
  db.Clinic.findById(clinicId)
    .populate('location')
    .exec(function(err, foundClinic) {
      if (err) {
        res.status(500).json({error: err.message});
      } else if (foundClinic === null) {
        res.status(404).json({error: "No Clinic found by this ID"});
      } else {
        // find the character by id
        var deletedCharacter = foundClinic.characters.id(characterId);
        // delete the found character
        deletedCharacter.remove();
        // save the found clinic with the character deleted
        foundClinic.save();
        // send back the found clinic without the character
        res.json(foundClinic);
      }
    });
});



app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
