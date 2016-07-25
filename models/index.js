var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/clinic-companion");

module.exports.Clinic = require("./clinic.js");
module.exports.Location = require("./location.js");
module.exports.User = require("./user.js");
module.exports.Story = require("./story.js");
