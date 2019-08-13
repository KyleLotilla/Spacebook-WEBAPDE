const mongooseLib = require("../libs/mongooseLib.js");
const {Reservation} = require("../Schemas/Reservation.js");

module.exports = function (app) {
    app.get("/reservedDates/:spaceID", function (req, res) {
        mongooseLib.findDocs(Reservation, {spaceID: req.params.spaceID, status: "Active"}, "-_id date", function (docs) {
            res.status = 200;
            res.setHeader("Content-Type", "application/json");
            res.send(docs);
            res.end();
        });
    });
    
    app.post("/reserveSpace", function (req, res) {
        mongooseLib.saveDoc(new Reservation({spaceID: req.body.spaceID, accountID: req.cookies.accountID, date: req.body.date, status: "Active"}), function(newReservation) {
            req.session.locationName = req.body.locationName;
            req.session.reservation = newReservation;
            res.end();
        });
    });
    
}