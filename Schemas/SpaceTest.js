const mongoose = require("mongoose");

var spaceSchema = new mongoose.Schema({
	locationName: String,
});

var Space = mongoose.model("SpaceTest", spaceSchema);

module.exports = {
	Space
};