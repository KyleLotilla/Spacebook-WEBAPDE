const mongoose = require("mongoose");

var accountSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	cancel: Number
});

var Account = mongoose.model("AccountTest3", accountSchema);

module.exports = {
	Account
};