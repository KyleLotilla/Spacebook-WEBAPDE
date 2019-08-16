const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Space} = require("../Schemas/Space.js");

module.exports = function (app) {
    app.get("/viewspaces", function (req, res) {
        mongooseLib.findDocs(Space, {}, "", function (space) {
            res.render("viewspace", {space: space, accountID: req.cookies.accountID});
        });
    });
}