const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const SchemaTypes = mongoose.Schema.Types;

var spaceSchema = new mongoose.Schema({
	locationName: String,
	purpose: String,
	address: String,
	price: SchemaTypes.Double,
	capacity: Number,
	image: String,
	desc: String
});

var Space = mongoose.model("Space", spaceSchema);

module.exports = {
	Space
};