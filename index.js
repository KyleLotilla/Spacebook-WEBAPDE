const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const port = 9090;

const mongooseLib = require("./serverLibs/mongooseLib.js");
const {Account} = require("./Schemas/Account.js");
const {Space} = require("./Schemas/Space.js");
const {Favorite} = require("./Schemas/Favorite.js")
const {Reservation} = require("./Schemas/Reservation.js");
const {Rating} = require("./Schemas/Rating.js");
const {Comment} = require("./Schemas/Comment.js");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const session = require("express-session");
app.use(session({secret: "WEBADPE", resave: false, saveUninitialized: true}));

app.use(express.json());

require("./serverLibs/hbs.js")(app);

require("./serverLibs/scheduleLib.js");

function getRoutes(folderName) {
	fs.readdirSync(folderName).forEach(function(file){
		
		var fullPath = path.join(folderName, file);
		var stat = fs.lstatSync(fullPath);

		if (stat.isDirectory())
			getRoutes(folderName);
		else if (/.js$/.test(file))
			require("./" + fullPath)(app);
	});
}
getRoutes("routes");

app.listen(port, function() {
	console.log("App listening at " + port);
});

//mongooseLib.saveDoc(new Comment({account: "5d4e4481efa81e19a466c97d", space: "5d5035765854d40c90ed421a", comment: "Hello"}), function(doc){});
//mongooseLib.saveDoc(new Account({username: "test", password: "test", email: "t2@email.com", cancel: 2}), function(result){});
//mongooseLib.saveDoc(new Space({locationName: "testLocation"}));
//mongooseLib.viewDB(Favorite);
//mongooseLib.saveDoc(new Reservation({spaceID: "5d458e66887e4f1324f2bd2f", accountID: "5d46c6672ffd370e4c48f460", date: new Date("2019-10-10"), status: "Active"}));
/*mongooseLib.saveDoc(new Space({
	locationName: "testLocation1",
	purpose: "Multi-Purpose",
	address: "Las Pinas City",
	price: 999.99,
	capacity: 100,
	image: "./image.png",
	ratings: [
		{
			accountID: "5d4e4481efa81e19a466c97d",
			rating: 4
		},
		{
			accountID: "5d5034cffd33c8190893f290",
			rating: 3
		}
	],
	comments: [
		{
			accountID: "5d4e4481efa81e19a466c97d",
			comment: "Yes"
		},
		{
			accountID: "5d5034cffd33c8190893f290",
			comment: "Hi"
		}
	]
}, function(doc){}));*/