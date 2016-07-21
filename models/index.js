var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/clinic-app");

module.exports.Clinic = require("./clinic.js");
module.exports.Location = require("./location.js");
