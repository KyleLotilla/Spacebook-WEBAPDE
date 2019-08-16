const mongoose = require("mongoose");

var reservationSchema = new mongoose.Schema({
	space: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Space"
	},
	account: {
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