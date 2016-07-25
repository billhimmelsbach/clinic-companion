// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

//TODO
//Are they open now?
//TODO
// function ObjectIdCreate(string) {
//   var ObjectId = require('mongoose').Types.ObjectId;
//   var myObjectId = ObjectId.fromString(string);
//   return myObjectId;
// }


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

var clinics_list = [{
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
	story_appointment: "https://docasap.com/center/209315/-1/0/0/0/PPFA/9390684/0/0",
	social_media: "",
	loc: [
		37.805542, -122.296026
	],
	// storys: {type: Schema.Types.ObjectId, ref: 'Story'},
	// location: {type: Schema.Types.ObjectId, ref: 'Location'},
	image: "https://oaklandnorth.net/wp-content/uploads/2013/05/plannedparenthood-620x454.jpg",
	date_posted: currentTime,
	letter_designation: "",
}, {
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
	story_appointment: "https://docasap.com/center/206418/0/0/0/0/FPA/2430989/0",
	social_media: "",
	loc: [
		37.818030, -122.265158
	],
	// storys: {type: Schema.Types.ObjectId, ref: 'Story'},
	// location: {type: Schema.Types.ObjectId, ref: 'Location'},
	image: "http://www.fpawomenshealth.com/wp-content/uploads/2013/10/oakland-ca-480x360.jpg",
	date_posted: currentTime,
	letter_designation: "",
}, ];

var storys_list = [{
	story_content: "I had my abortion a week and a half ago. And it wasn't the terrible horror story people tell you. I'm only 21. I just got promoted to assistant manager at my work. I just now am able to pay for myself. Not anything else. The father was an ex of mine but we're still really good friends and do it from time to time. And I got pregnant.I've always been pro choice. But I never knew how to go about it. I went to a clinic that was a crisis pregnancy center and I didn't even know it. I told them I was thinking about getting an abortion. They didn't like judge me harshly but they did give me really bad information such as: pieces of the fetus will be left behind and they'll scrap out your uterus. Which kind of scared me. But I figured I should go to the actual clinic to hear from people who actually do it. And they were really nice and compassionate. In fact many of them were patients there. The pre-counsel session was really nice. And they asked me about the clinic-that I didn't know was cpc - and the woman told me it was false. That there's no metal that goes past the cervix.After a week (because of Memorial Day) I had it done. It wasn't painful. It wasn't terrible. Then again I was on painkillers. But it wasn't a horror story at all. I was crampy real bad the rest of the day. And I still was crampy for about a week but not bad at all. I was able to resume my life the next day. And honestly I have no regrets. And I just want women to know that it isn't a terrifying thing that happens to your body. And to get the facts straight from the source.",
  username: "ashley@exampleemail.com",
	date_posted: currentTime,
  clinicName: "Planned Parenthood - West Oakland",
},
{
	story_content: "I am 30 happily married with two little ones, I had already made up my mind after giving birth to my 2nd that I was done two was enough for me! Unfortunately we were not careful enough and I saw those two lines. My heart didn't drop I didn't feel anxious or sad I just knew what the right decision for me was.Today I went for the procedure as it would be 'quick' and I could have an iud put in at the same time. After a quick chat with a counselor it was on to the next step. They did an ultrasound and this is where it went a bit different, using both methods they could not see an embryo so they had me take another pregnancy test which came in positive. The nurse had quick chat with the doc they figured that I had either already miscarried (as they saw a bit of 'junk' in my uterus but no sack or embryo) or there was a possibility that it's ectopic.The doc suggested that they still do the d&c to get whatever was in there out (as passing this may disrupt the iud) and have me take a blood test a few days later to see if the levels of P hormone decrease. I choose not to be sedated. I didn't feel pain at any point. Discomfort when they put the scapula in an a little poke when they numb the cervix, the rest just felt like pressure an a little weird. I did not want to feel dopey/sleepy and I didn't, I had very mild cramps for the 30m they make you wait after but felt fine after. What ever decision you make is what's right for you. I'm not sure if I mentally feel like I had the abortion as they didn't see anything but I still feel at peace with my decision an of course I am hoping it's not ectopic!!",
	username: "jane@exampleemail.com",
	date_posted: currentTime,
  clinicName: "FPA Women’s Health - Oakland",
},
];

var users_list = [{
	username: "admin@exampleemail.com",
	salt: "6a0d12bfbc1fcab0173d3a9d75e509ab6d8881e5f669288d441e1d15556671f4",
	hash: "d3f9db3a88be9f98551e149a0f1ce45c9d0d93afa877f3ccf62492e96bde45143385bc552690d8bc7e4f1e575578e6d251a956acd27c221820a561766e17599ac167d48f0f3554773aa6c335f0891187f4822eb61b4a09a5839fb01523512fccd8904d053b547a3c564afd2094e6e4b2588928cc305a03d6a50a634c5903018372af0220db9e6e2f6a132b967ec758707cec62aabad409b6802a6c7df512c8407c800c9c71588e8691494ade344aacce6c5221676aa184c0918dd2d71d5d60b371af29f5e0155d3f863f095d22b2413bd5f8ace38c954d6108cf665ddac421c73e183aa457e98042defa51c7eb3435c81619ac2ac3c31f318f0c85ef6e37483795e137e521e0a2c2e4bcc69601ea0470fe0dad8f2066d5180120fec82da80b9ccd50151577131e0929ee8af8fda4d032415fabc31b74d24a31f0f642a735bf38cc914baf8152967806041fd2cb4436f4a9766244e5b9d4d27f1fbedaff0bfa20cf054825d258c861ba64bad79ebbe68ee7ba7be5417c2dbe322affc05655040d6b1ccbf6f5baa982a1f304e6241935b3c030185e1c0306a87b7d20d588633331469436300600c9b68d4cc0c5fb3421031ccaf20b54c3f6547c8beb7d51f7da5021fb55dea9bab27bc891467e4fcdd25fa110fe54c602d767afaff7be59417d1530cbe4226771bcae7f2a722f9037e1854f33df023a3936c939e2b2d6e9c11975",
	date_created: currentTime,
}, {
	username: "ashley@exampleemail.com",
	salt: "77e1d64e129b6ad2ef407357798a2289cf7a9f34ed1b5a14f71bd0a342acd6b0",
	hash: "879adae576e4e96792d747eb9ba7596f11addc7664ef92e11b3c07f09c3ac72f3706d25078fa186e1099b0ea8d11721c4fdad3b8d0d2ceebcb70b9ee383476f24cba52d83ef16710d7dc39fdd375df4492a838b9826e3c80cca117d9cafe51ab4825b892348dfd4537b4af3659d6d8375725d2caa924caadd5e61399e7f674af9c06afa28a8049931466424cce1ee1d581690627284543b4b60b516aaa65f0eb661074990a2af2d43af9e465833346e884885b29fa0333356ee08cf3070654e6e1e0525f84c77a4f6f62a077c286c0bd69b077de6c472630dd0c42276a11d7352fedc06acee7b43422e5462fd9cc4a8bc2ab5835edbb31829731392d6f819d548b486429d127762761a0c6d233ffa5812b03f2be815c36f19f38ae657e17c3b7982cfc14b88e94d2a2d427ffeb4a6810a3fd6e79567376f7c8033b66d72c60411156005be61e0cdde65cb98ad0d077929b937d1ce7916e40ef36f4bacfbf4f3c2f085bf509ae3a55c3fc61b4ed29e75f6d1327be743302f2c6ea076be8851c1aaff192d834aeae3e32866343c9fc8babcaab9205aa1cb58a2a41d0f5b0592622b44ac71aed77e0dda7334c84ac3ab23c54df0dc457e999fa46b639a71d8523200e9230176341f6a4f1da129725fdd8abfa0970989a5ca502071d4157e7c1daaf3302f77222d70914f6de6baa51434722f9a839a29ba8b9528e5d6ab5ea2a0de4",
	date_created: currentTime,
}, {
	username: "jane@exampleemail.com",
	salt: "425d6d430a7ef27035c1330b7404c44058895d70376f5e2e4fe7ce9230ddf56b",
	hash: "ddf997ad91749ccd7b1321e8479e4f61ca474899d71bab9127c89a55d3ffe5a131dd033824118f325e23a81c843b475ce891e167596b450027d495026ba54740ef66e997c189cebb9322ab218e79240c10685af1ab0a3b38dee2603d48815d814cb7e16f474edbf690614b8a58d789b3ff32b381a36d7bf1de6c1c97b85fe090523260fb44c2669e1e72e1a90b15f0cc26202e9f5c69ee69907dc13adefb31eb2615ea9d533b359f40ee36570d40ae29a99ecf77646b846e4af5ed9c97321be80d6eda62fd5fba989b54e93b45cd8f015d4fcf13bc669de61add28b533ef92f3439a6c0351451fd49b52c9f43bd66f8abd3e24e9452ca0576659f1ffc028350425b3b3ac54397892351db1c8dee4f3af60a2301174462e4b24d309263bbd8c2a68ec051ab60030dea84ea36e36de8615328fd9331a522f6379e8cd7ce3a8a11dc4703472ef1a2efb8dcc70f9e53fce10596c4c6014f10c50ef65b66e8ff103414bfd3dbcd78db91ce531cb7c0a0189c96e48f97745054f4f7f014fbfcdc0536eba4702fee77cfbf7fab9feba598d5ee48ef844d8095f6327bbba1eb2bf4c26f2569290ff2bb5ade39032ccb449a6570d002692e923fa1574916034d03e0d0a5908668a92d83ffb8a022e7d2d8732113435a12bb334365d41c96a9c955c88bea1a27bb4d7c3a97bf2834a6cd65ff785e280721183c62d3d9c09637d3f1bfc5465",
	date_created: currentTime,
}, ];

db.Clinic.remove({}, function(err, clinics) {
	console.log('removed all clinics');
	clinics_list.forEach(function(clinicData) {
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
			email: clinicData.email,
			website: clinicData.website,
			story_appointment: clinicData.story_appointment,
			social_media: clinicData.social_media,
			loc: clinicData.loc,
			storys: clinicData.storys,
			image: clinicData.image,
			letter_designation: clinicData.letter_designation,
			date_posted: clinicData.date_posted
		});
		console.log("ooooh k");
		newClinic.save(function(err, savedClinic) {
			if (err) {
				return console.log(err);
			}
			console.log("ok!");
			console.log('saved clinic ' + savedClinic.name);
		});
	});
});
console.log("!!!ALL CLINICS CREATED!!!");

setTimeout(function(){
db.User.remove({}, function(err, users) {
  console.log('removed all users');
  db.User.create(users_list, function(err, users){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all users');
    console.log("created", users.length, "users");

    db.Story.remove({}, function(err, storys){
      console.log('removed all storys');
      storys_list.forEach(function (storyData) {
        var story = new db.Story({
          story_content: storyData.story_content,
        	username: storyData.username,
        	clinicName: storyData.clinicName,
        	date_posted: currentTime,
        });
        db.User.findOne({username: storyData.username}, function (err, foundUser) {
          console.log('found user ' + foundUser.username + ' for story ' + storyData.username);
          if (err) {
            console.log(err);
            return;
          }
          story.username = foundUser;
          story.save(function(err, savedStory){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedStory.username + ' by ' + foundUser.username);
          });
        });
        db.Clinic.findOne({name: storyData.clinicName}, function (err, foundClinic) {
          console.log('found user ' + foundClinic.name + ' for story ' + storyData.clinicName);
          if (err) {
            console.log(err);
            return;
          }
          story.clinic = foundClinic;
          story.save(function(err, savedStory){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedStory.clinic + ' by ' + foundClinic.name);
          });
        });
      });
    });

  });
});
}, 4000);

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
// db.User.remove({}, function(err, users) {
// 	console.log('removed all users');
// 	users_list.forEach(function(userData) {
// 		var newUser = new db.User({
// 			username: userData.username,
// 			salt: userData.salt,
// 			hash: userData.hash,
// 			date_created: userData.date_created,
// 		});
// 		newUser.save(function(err, savedUser) {
// 			if (err) {
// 				return console.log(err);
// 			}
// 			console.log("ok!");
// 			console.log('saved user ' + savedUser.username);
// 		});
// 	});
// });
// console.log("!!!ALL USERS CREATED!!!");
//
//

//
// setTimeout(function(){
//   db.Story.remove({}, function(err, storyData, index) {
//     console.log('removed all storys');
//     storys_list.forEach(function(storyData) {
//       var newStory = new db.Story({
//       	story_content: storyData.story_content,
//       	username: storyData.username,
//       	clinic: storyData.clinic,
//       	date_posted: currentTime,
//       });
//       console.log(storyData.username);
//       console.log(storyData);
//       console.log(newStory);
//       db.User.findOne({username: storyData.username}, function(err, foundUser) {
//       	console.log('found user ' + foundUser.username + ' for story ' + storyData.username);
//       	if (err) {
//       		console.log(err);
//       		return;
//       	}
//       	console.log("WUUUT");
//       	newStory.username = foundUser;
//         console.log("!!190!!"+newStory+"!!190!!");
//
//       	newStory.save(function(err, savedStory) {
//       		if (err) {
//       			return console.log(err);
//       		}
//       		console.log("ok!");
//       		console.log('saved ' + savedStory.username);
//           console.log('saved ' + savedStory);
//       	});
//       });
//
//     });
//   });
//   console.log("!!!ALL STORYS CREATED!!!");
// }, 4000);

  // newStory.save(function(err, savedStory) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("ok!");
  //   console.log('saved story ' + savedStory._id);
  // });

// db.Location.findOne({name: clinicData.location}, function (err, foundLocation) {
//   // console.log('found location ' + foundLocation.name + ' for clinic ' + clinic.title);
//   if (err) {
//     console.log(err);
//     return;
//   }
//   clinic.location = foundLocation;

//Save function with console log that references location
// clinic.save(function(err, savedClinic){
//   if (err) {
//     return console.log(err);
//   }
//   console.log('saved ' + savedClinic.title + ' by ' + foundLocation.name);
// });
//


// });
