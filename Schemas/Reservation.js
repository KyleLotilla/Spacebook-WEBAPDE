const mongoose = require("mongoose");

var reservationSchema = new mongoose.Schema({
	spaceID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Space"
	},
	accountID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account"
	},
	date: Date,
	status: String
});

var Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = {
	Reservation
};