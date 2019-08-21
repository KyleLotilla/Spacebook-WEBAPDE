const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Space} = require("../Schemas/Space.js");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.redirect("/home");
    });

    app.get("/home", function (req, res) {
        res.render("home", {accountID: req.cookies.accountID});
    });

    app.get("/featured", function (req, res){
        mongooseLib.findDocsWithOptions(Space, {}, "", {sort: {"_id": -1}, limit: 3}, function(featured){
            res.render("featured", {featured: featured});
        });
    });
}