const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Notification} = require("../Schemas/Notification.js");

module.exports = function (app) {
    app.get("/checkNotifcations", function (req, res){
        mongooseLib.findDocs(Notification, {account: req.cookies.accountID, checked: false}, "account checked", function(notifications){
            res.send({numNotifications: notifications.length});
            res.end();
        });
    });
}