// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
var currentTime = new Date();
var clinics_list = [
  {
    name: "Planned Parenthood - West Oakland",
    address: "1682 7th St",
    address2: null,
    address3: null,
    city: "Oakland",
    state: "CA",
    zipcode: "94607",
    phone_number: "510-300-3800",
    costs: null,
    email: String,
    website: "https://www.plannedparenthood.org/health-center/california/oakland/94607/west-oakland-4090-90130?utm_campaign=west-oakland-health-center&utm_medium=organic&utm_source=local-listing",
    book_appointment: "https://docasap.com/center/209315/-1/0/0/0/PPFA/9390684/0/0",
    social_media: null,
    stories: {type: Schema.Types.ObjectId, ref: 'Story'},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: null,
    date_posted: currentTime,
  },
];
  // {
  // title: "The Great Gatsby",
  // location: "F Scott Fitzgerald",
  // image: "https://s3-us-west-2.amazonaws.com/sandboxapi/great_gatsby.jpg",
  // releaseDate: "April 10, 1925"
  // },

// var locations_list = [
//   {
//     name: "Harper Lee",
//     alive: false
//   },
//   {
//     name: "F Scott Fitzgerald",
//     alive: false
//   },
//   {
//     name: "Victor Hugo",
//     alive: false
//   }
// ];

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
