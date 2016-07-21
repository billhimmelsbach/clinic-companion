// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var clinics_list = [
  {
  title: "To Kill a Mockingbird",
  location: "Harper Lee",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/to_kill_a_mockingbird.jpg",
  releaseDate: "July 11, 1960"
  },
  {
  title: "The Great Gatsby",
  location: "F Scott Fitzgerald",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/great_gatsby.jpg",
  releaseDate: "April 10, 1925"
  },
  {
  title: "Les Miserables",
  location: "Victor Hugo",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/les_miserables.jpg",
  releaseDate: "Unknown 1862"
  },
  {
  title: "Around the World in 80 Days",
  location: "Jules Verne",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/around_the_world_in_80_days.jpg",
  releaseDate: "January 30, 1873"
  },
  {
  title: "Lean In",
  location: "Sheryl Sandberg",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/lean_in.jpg",
  releaseDate: "March 11, 2013"
  },
  {
  title: "The Four Hour Workweek",
  location: "Tim Ferriss",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
  releaseDate: "April 1, 2007"
  },
  {
  title: "Of Mice and Men",
  location: "John Steinbeck",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
  releaseDate: "Unknown 1937"
  },
  {
  title: "Romeo and Juliet",
  location: "William Shakespeare",
  image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
  releaseDate: "Unknown 1597"
  }
];

var locations_list = [
  {
    name: "Harper Lee",
    alive: false
  },
  {
    name: "F Scott Fitzgerald",
    alive: false
  },
  {
    name: "Victor Hugo",
    alive: false
  },
  {
    name: "Jules Verne",
    alive: false
  },
  {
    name: "Sheryl Sandberg",
    alive: true
  },
  {
    name: "Tim Ferriss",
    alive: true
  },
  {
    name: "John Steinbeck",
    alive: false
  },
  {
    name: "William Shakespeare",
    alive: false
  }
];

db.Location.remove({}, function(err, locations) {
  console.log('removed all locations');
  db.Location.create(locations_list, function(err, locations){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all locations');
    console.log("created", locations.length, "locations");


    db.Clinic.remove({}, function(err, clinics){
      console.log('removed all clinics');
      clinics_list.forEach(function (clinicData) {
        var clinic = new db.Clinic({
          title: clinicData.title,
          image: clinicData.image,
          releaseDate: clinicData.releaseDate
        });
        db.Location.findOne({name: clinicData.location}, function (err, foundLocation) {
          console.log('found location ' + foundLocation.name + ' for clinic ' + clinic.title);
          if (err) {
            console.log(err);
            return;
          }
          clinic.location = foundLocation;
          clinic.save(function(err, savedClinic){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedClinic.title + ' by ' + foundLocation.name);
          });
        });
      });
    });

  });
});
