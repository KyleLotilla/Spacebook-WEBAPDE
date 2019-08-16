const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Space} = require("../Schemas/Space.js");

module.exports = function (app) {
    app.get("/space/:spaceID", function (req, res) {
        mongooseLib.findById(Space, req.params.spaceID, "", function(space){
            space.accountID = req.cookies.accountID;
            res.render("space", space);
        })
    });
}