module.exports = function (app) {
    app.get("/reservationCreated", function (req, res) {
        if (req.cookies.accountID == "")
            res.redirect("/home");
        else {
            res.render("reservationCreated", {reservation: req.session.reservation, locationName: req.session.locationName, accountID: req.cookies.accountID});
            req.session.reservation = null;
            req.session.locationName = null;
        }
    });
}