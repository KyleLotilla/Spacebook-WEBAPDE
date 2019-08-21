const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Notification} = require("../Schemas/Notification.js");

module.exports = function (app) {
    app.get("/notification", function (req, res) {
        if (req.cookies.accountID == "")
            res.redirect("/home");
        else {
            mongooseLib.findDocs(Notification, {account: req.cookies.accountID}, "notification checked", function(notifications){
                res.render("notification", {notifications: notifications, accountID: req.cookies.accountID});
                mongooseLib.updateMany(Notification, {account: req.cookies.accountID}, {checked: true}, false, function(update){
                    console.log(update);
                });
            });
        }
    });
}