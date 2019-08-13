const mongoose = require("mongoose");

var reservationSchema = new mongoose.Schema({
	spaceID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SpaceTest2"
	},
	accountID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AccountTest3"
	},
	date: Date,
	status: String
});

var Reservation = mongoose.model("ReservationTest3", reservationSchema);

module.exports = {
	Reservation
};