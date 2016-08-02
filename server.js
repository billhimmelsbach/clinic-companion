
//CONFIG

//require express in our app
var express = require('express'),
/* TODO: consider indenting all variable assignments after the first line -jc */
bodyParser = require('body-parser'),
moment = require('moment'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

// connect to db models
/* TODO: consider grouping all require calls together for consistency -jc */
var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static(__dirname + '/public'));
/* TODO: please remove all commented code from development versions -jc */
// app.use(express.static('public'));


// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

moment().format();

app.set('view engine', 'hbs');
/* TODO: please remove all commented code from development versions -jc */
// app.set('view engine', 'html');

/* TODO: consider grouping all require calls together for consistency -jc */
var controllers = require('./controllers');

app.use(cookieParser());
app.use(session({
  secret: 'strongenoughtobearthechildrenthengetbacktobusiness1',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/* TODO: consider grouping all require calls together for consistency -jc */
/* TODO: db has been defined and required @ line 16 already.-jc */
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

/* TODO: Fun Challenge: extract the auth routing and configurations to a separate auth controller. This will shrink your server.js considerably. -jc */
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
      /* TODO: please use error handling in this route -jc */
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
/* TODO: consider using white space between controller batches for easier reading and navigation -jc */

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
