const {Account} = require("../Schemas/Account.js");
const schedule = require("node-schedule");
const mongooseLib = require("./mongooseLib.js");

schedule.scheduleJob("0 0 * * *", function() {
	mongooseLib.updateMany(Account, {}, {cancel: 2}, false, function (result) {
		console.log("Updated Cancels:\n" + result);
	});
});

schedule.scheduleJob("0 0 * * *", function() {
	var tomDate = new Date(Date.now());
	tomDate.setDate(tomDate.getDate() + 1);
	mongooseLib.updateMany(Reservation, {status: "Active", }, )
});


