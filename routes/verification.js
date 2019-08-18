const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Account} = require("../Schemas/Account.js");

module.exports = function (app) {
    app.get("/verification/:hash", function(req, res){
        mongooseLib.updateMany(Account, {verification: req.params.hash}, {verified: true}, false, function(update){
            res.render("verified");
        });
    });
}