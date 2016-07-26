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


//CONFIG

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
  console.log('logged in'); // sanity check
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

//ROUTES

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', controllers.api.index);
app.get('/api/clinics', controllers.clinics.index);
app.get('/api/clinics/:clinicId', controllers.clinics.show);
app.put('/api/clinics/:clinicId', controllers.clinics.update);
app.post('/api/clinics', controllers.clinics.create);
app.delete('/api/clinics/:clinicId', controllers.clinics.destroy);
app.get('/api/storys', controllers.storys.index);
app.get('/api/storys/:storyId', controllers.storys.show);
app.put('/api/storys/:storyId', controllers.storys.update);
app.post('/api/storys', controllers.storys.create);
app.delete('/api/storys/:storyId', controllers.storys.destroy);
app.get('/api/clinics/:clinicId/storys', controllers.clinicsStorys.index);
app.post('/api/clinics/:clinicId/storys', controllers.clinicsStorys.create);
app.get('/api/locations/', controllers.clinics.findNearest);

//SERVER PORTS
app.listen(process.env.PORT || 3000, function () {
  console.log('Clinic Companion listening at http://localhost:3000/');
});
