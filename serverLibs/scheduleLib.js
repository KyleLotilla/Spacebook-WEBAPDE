const {Account} = require("../Schemas/Account.js");
const {Reservation} = require("../Schemas/Reservation.js");
const {Notification} = require("../Schemas/Notification.js");
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
	tomDate = new Date (tomDate.toISOString().split("T")[0] + "T00:00:00Z");

	mongooseLib.joinQuery(Reservation, {status: "Active", date: tomDate},  "account space date", "space", "", function(reservations){
		var date = tomDate.toLocaleDateString("en-US", {month: "long", day: "2-digit", year: "numeric"});
		reservations.forEach(function(reservation){
			var notificationString = "Your Reservation for " + reservation.space.locationName + " is coming up tommorrow (" + date + ")." + "<a href = \"http://localhost:9090/space/" + reservation.space._id + "\"> Check out it on Spacebook! </a>";

			var notification = new Notification({account: reservation.account, notification: notificationString, checked: false});

			mongooseLib.saveDoc(notification, function(newDoc){});
		});
	});
});

schedule.scheduleJob("0 0 * * *", function() {
	var curDate = new Date(Date.now());
	curDate = new Date (curDate.toISOString().split("T")[0] + "T00:00:00Z");

	mongooseLib.joinQuery(Reservation, {status: "Active", date: curDate},  "account space date", "space", "", function(reservations){
		var date = curDate.toLocaleDateString("en-US", {month: "long", day: "2-digit", year: "numeric"});
		reservations.forEach(function(reservation){
			var notificationString = "Your Reservation for " + reservation.space.locationName + " is today (" + date + ")." + "<a href = \"http://localhost:9090/space/" + reservation.space._id + "\"> Check out it on Spacebook! </a>";

			var notification = new Notification({account: reservation.account, notification: notificationString, checked: false});

			mongooseLib.saveDoc(notification, function(newDoc){});
		});
		mongooseLib.updateMany(Reservation, {status: "Active", date: curDate}, {status: "Ongoing"}, false, function(reservations) {
			console.log(reservations);
		});
	});
});

schedule.scheduleJob("0 0 * * *", function() {
	var curDate = new Date(Date.now());
	curDate = new Date (curDate.toISOString().split("T")[0] + "T00:00:00Z");

	mongooseLib.joinQuery(Reservation, {$or: [{status: "Active"}, {status: "Ongoing"}], date: {$lt: curDate}},  "account space date", "space", "", function(reservations){
		reservations.forEach(function(reservation){
			var date = new Date(reservation.date);
			date = date.toLocaleDateString("en-US", {month: "long", day: "2-digit", year: "numeric"});
			var notificationString = "Your Reservation for " + reservation.space.locationName + " is finished (" + date + ")." + "<a href = \"http://localhost:9090/space/" + reservation.space._id + "\"> Check out it on Spacebook! </a>";

			var notification = new Notification({account: reservation.account, notification: notificationString, checked: false});

			mongooseLib.saveDoc(notification, function(newDoc){});
		});
		mongooseLib.updateMany(Reservation, {$or: [{status: "Active"}, {status: "Ongoing"}], date: {$lt: curDate}}, {status: "Finished"}, false, function(reservations) {
			console.log(reservations);
		});
	});
});

