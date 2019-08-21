const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Account} = require("../Schemas/Account.js");
const {Favorite} = require("../Schemas/Favorite.js");

module.exports = function (app) {
	app.get("/favorites", function(req, res) {
        if (req.cookies.accountID == "")
            res.redirect("/home");
        else {
            mongooseLib.findById(Account, req.cookies.accountID, "-_id cancel", function (account) {
                mongooseLib.joinQuery(Favorite, {account: req.cookies.accountID}, "", "space", "locationName", function(docs){
                    var renderData = {favorites: docs, accountID: req.cookies.accountID};
                    res.render("favorite", renderData);
                });
            });
        }
    });

    app.post("/removeFavorite", function(req, res) {
        mongooseLib.deleteDocs(Favorite, {_id: req.body.favoriteID}, function(result) {
            res.end();
        });
    });
}