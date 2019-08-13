module.exports = function (app) {
    app.get("/reservationCreated", function (req, res) {
        res.render("reservationCreated", {reservation: req.session.reservation, locationName: req.session.locationName});
        req.session.reservation = null;
        req.session.locationName = null;
    });
}