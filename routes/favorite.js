const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Favorite} = require("../Schemas/Favorite.js");

module.exports = function (app) {
	app.post("/addFavorite", function (req, res) {
        mongooseLib.saveDoc(new Favorite({space: req.body.spaceID, account: req.cookies.accountID}), function(newFavorite) {
            req.session.locationName = req.body.locationName;
            req.session.favorite = newFavorite;
            res.end();
        });
    });
}