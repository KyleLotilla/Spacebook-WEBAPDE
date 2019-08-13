const mongoose = require("mongoose");

var ratingSchema = new mongoose.Schema({
    space: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space"
    },
    account: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account"
    },
    rating: Number
});

var Rating = mongoose.model("Rating", ratingSchema);
module.exports = {
    Rating
};