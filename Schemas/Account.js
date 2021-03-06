const mongoose = require("mongoose");

var accountSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	verification: String,
	verified: Boolean,
	cancel: Number
});

var Account = mongoose.model("Account", accountSchema);

module.exports = {
	Account
};