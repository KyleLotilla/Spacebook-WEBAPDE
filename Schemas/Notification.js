const mongoose = require("mongoose");

var notificationSchema = new mongoose.Schema({
    account: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account"
    },
    notification: String,
    checked: Boolean
});

var Notification = mongoose.model("Notification", notificationSchema);
module.exports = {
    Notification
};