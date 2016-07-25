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
    address1: "1682 7th St.",
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
      37.805542,
      -122.296026
    ],
    // storys: {type: Schema.Types.ObjectId, ref: 'Story'},
    // location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: "https://oaklandnorth.net/wp-content/uploads/2013/05/plannedparenthood-620x454.jpg",
    date_posted: currentTime,
    letter_designation:"",
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
    // storys: {type: Schema.Types.ObjectId, ref: 'Story'},
    // location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: "http://www.fpawomenshealth.com/wp-content/uploads/2013/10/oakland-ca-480x360.jpg",
    date_posted: currentTime,
    letter_designation:"",
  },
];

  var storys_list = [
    {
      story_content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      // user:"",
      date_posted: currentTime,
    },
    {
      story_content: "Test Test Test",
      // user:"",
      date_posted: currentTime,
    },
  ];

  // var users_list = [
  //   {
  //     username: "whimmels@gmail.com",
  //     // user:"",
  //     // password: "",
  //     date_created: currentTime,
  //   },
  //   {
  //     username: "cansofspams@gmai.com",
  //     // user:"",
  //     // password: "",
  //     date_created: currentTime,
  //   },
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
// db.User.remove({}, function(err, users){
//   console.log('removed all users');
//   users_list.forEach(function (userData) {
//     var newUser = new db.User({
//       name: clinicData.name,
//       username: userData.username,
//       password: password.username,
//       date_created: currentTime,
//     });
//   });
// });

db.Story.remove({}, function(err, storyData, index){
  console.log('removed all storys');
  storys_list.forEach(function (storyData) {
    var newStory = new db.Story({
      story_content: storyData.story_content,
      username: storyData.username,
      clinic: storyData.clinic,
      date_posted: currentTime,
    });
    newStory.save(function(err, savedStory){
      if (err) {
        return console.log(err);
      }
      console.log("ok!");
      console.log('saved story ' + savedStory._id);
    });
  });
});



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
      storys: clinicData.storys,
      image: clinicData.image,
      letter_designation: clinicData.letter_designation,
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
