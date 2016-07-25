var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/clinic-companion");

module.exports.Clinic = require("./clinic.js");
module.exports.Location = require("./location.js");
module.exports.User = require("./user.js");
module.exports.Story = require("./story.js");
