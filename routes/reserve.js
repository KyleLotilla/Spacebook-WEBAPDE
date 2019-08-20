const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Reservation} = require("../Schemas/Reservation.js");
const moment = require("moment");

module.exports = function (app) {
    app.get("/reservedDates/:spaceID", function (req, res) {
        mongooseLib.findDocs(Reservation, {space: req.params.spaceID, status: "Active"}, "-_id date", function (docs) {
            res.status = 200;
            res.setHeader("Content-Type", "application/json");
            res.send(docs);
            res.end();
        });
    });
    
    app.post("/reserveSpace", function (req, res) {
        var date = moment.utc([req.body.year, req.body.month - 1, req.body.day]).toDate();
        mongooseLib.saveDoc(new Reservation({space: req.body.spaceID, account: req.cookies.accountID, date: date, status: "Active"}), function(newReservation) {
            req.session.locationName = req.body.locationName;
            req.session.reservation = newReservation;
            res.end();
        });
    });
    
}