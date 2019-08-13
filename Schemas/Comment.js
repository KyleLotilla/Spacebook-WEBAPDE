const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    space: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space"
    },
    account: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account"
    },
    comment: String
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = {
    Comment
};