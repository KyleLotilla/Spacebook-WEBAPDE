const mongooseLib = require("../libs/mongooseLib.js");
const {Account} = require("../Schemas/Account.js");
const {Reservation} = require("../Schemas/Reservation.js");

module.exports = function (app) {
    app.get("/reservation", function(req, res) {
        mongooseLib.findById(Account, req.cookies.accountID, "-_id cancel", function (account) {
            mongooseLib.joinQuery(Reservation, {accountID: req.cookies.accountID}, "", "spaceID", "locationName", function(docs){
                var renderData = {cancel: account.cancel, reservations: docs};
                res.render("reservation", renderData);
            });
        });
    });
    
    app.post("/cancelReservation", function(req, res) {
        mongooseLib.updateById(Reservation, req.body.reservationID, {status: "Canceled"}, function(result) {
            mongooseLib.updateById(Account, req.cookies.accountID, {$inc: {cancel: -1}}, function(result) {
                res.end();
            });
        });
    });
}