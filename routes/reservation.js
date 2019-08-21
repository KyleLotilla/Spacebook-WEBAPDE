const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Account} = require("../Schemas/Account.js");
const {Reservation} = require("../Schemas/Reservation.js");

module.exports = function (app) {
    app.get("/reservation", function(req, res) {
        if (req.cookies.accountID == "")
            res.redirect("/home");
        else {
            mongooseLib.findById(Account, req.cookies.accountID, "-_id cancel", function (account) {
                mongooseLib.joinQuery(Reservation, {account: req.cookies.accountID}, "", "space", "locationName", function(docs){
                    var renderData = {cancel: account.cancel, reservations: docs, accountID: req.cookies.accountID};
                    res.render("reservation", renderData);
                });
            });
        }
    });
    
    app.post("/cancelReservation", function(req, res) {
        mongooseLib.updateById(Reservation, req.body.reservationID, {status: "Canceled"}, function(result) {
            mongooseLib.updateById(Account, req.cookies.accountID, {$inc: {cancel: -1}}, function(result) {
                res.end();
            });
        });
    });
}