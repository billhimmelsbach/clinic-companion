// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

//TODO
//Are they open now?
//TODO

var db = require('./models');
var currentTime = new Date();
// var locations_list = [
//   {
//     name: Test,
//     loc: {
//       type: [Number],
//       index: '2d'
//     }
//   }
// ];

var clinics_list = [
  {
    name: "Planned Parenthood - West Oakland",
    address1: "1682 7th St",
    address2: "",
    address3: "",
    city: "Oakland",
    state: "CA",
    zipcode: "94607",
    phone_number: "510-300-3800",
    costs: "",
    email: "",
    website: "https://www.plannedparenthood.org/health-center/california/oakland/94607/west-oakland-4090-90130?utm_campaign=west-oakland-health-center&utm_medium=organic&utm_source=local-listing",
    book_appointment: "https://docasap.com/center/209315/-1/0/0/0/PPFA/9390684/0/0",
    social_media: "",
    loc: [
      37.813910,
      -122.290908
    ],
    // stories: {type: Schema.Types.ObjectId, ref: 'Story'},
    // location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: "",
    date_posted: currentTime,
  },
  {
    name: "FPA Women’s Health - Oakland",
    address1: "400 29th St.",
    address2: "#301",
    address3: "",
    city: "Oakland",
    state: "CA",
    zipcode: "94609",
    phone_number: "510-899-7099",
    costs: "",
    email: "",
    website: "http://www.fpawomenshealth.com/locations/oakland-ca/",
    book_appointment: "https://docasap.com/center/206418/0/0/0/0/FPA/2430989/0",
    social_media: "",
    loc: [
      37.818030,
      -122.265158
    ],
    // stories: {type: Schema.Types.ObjectId, ref: 'Story'},
    // location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: "",
    date_posted: currentTime,
  },
];
  // {
  // title: "The Great Gatsby",
  // location: "F Scott Fitzgerald",
  // image: "https://s3-us-west-2.amazonaws.com/sandboxapi/great_gatsby.jpg",
  // releaseDate: "April 10, 1925"
  // },

var locations_list = [];

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
//
// db.Location.remove({}, function(err, locations) {
//   console.log('removed all locations');
//   db.Location.create(locations_list, function(err, locations){
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('recreated all locations');
//     console.log("created", locations.length, "locations");
//   });
// });


db.Clinic.remove({}, function(err, clinics){
  console.log('removed all clinics');
  clinics_list.forEach(function (clinicData) {
    var newClinic = new db.Clinic({
      name: clinicData.name,
      address1: clinicData.address1,
      address2: clinicData.address2,
      address3: clinicData.address3,
      city: clinicData.city,
      state: clinicData.state,
      zipcode: clinicData.zipcode,
      phone_number: clinicData.phone_number,
      costs: clinicData.costs,
      email: clinicData.email ,
      website: clinicData.website,
      book_appointment: clinicData.book_appointment,
      social_media: clinicData.social_media,
      loc:clinicData.loc,
      stories: clinicData.stories,
      image: clinicData.image,
      date_posted: clinicData.date_posted
    });
    console.log("ooooh k");
    // db.Location.findOne({name: clinicData.location}, function (err, foundLocation) {
    //   // console.log('found location ' + foundLocation.name + ' for clinic ' + clinic.title);
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   clinic.location = foundLocation;

    newClinic.save(function(err, savedClinic){
      if (err) {
        return console.log(err);
      }
      console.log("ok!");
      console.log('saved ' + savedClinic.name);
    });


    //Save function with console log that references location
      // clinic.save(function(err, savedClinic){
      //   if (err) {
      //     return console.log(err);
      //   }
      //   console.log('saved ' + savedClinic.title + ' by ' + foundLocation.name);
      // });
      //


    // });
  });
});
//
//   });
// });
