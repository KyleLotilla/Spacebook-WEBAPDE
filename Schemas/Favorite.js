const mongoose = require("mongoose");

var favoriteSchema = new mongoose.Schema({
	space: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Space"
	},
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account"
	}
});

var Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = {
	Favorite
};