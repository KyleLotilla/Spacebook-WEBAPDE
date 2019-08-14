const mongooseLib = require("../libs/mongooseLib.js");
const {Rating} = require("../Schemas/Rating.js");
const {Comment} = require("../Schemas/Comment.js");

module.exports = function(app) {
    app.post("/rateSpace/:spaceID", function(req, res) {
        mongooseLib.updateMany(Rating, {account: req.cookies.accountID, space: req.params.spaceID}, {rating: req.body.rating}, true, function(newRating){
            res.end();
        });
    });

    app.post("/commentSpace/:spaceID", function(req, res){
        var comment = new Comment({account: req.cookies.accountID, space: req.params.spaceID, comment: req.body.comment});
        mongooseLib.saveDoc(comment, function(newComment) {
            res.end();
        });
    });

    app.get("/feedbackInput/:spaceID", function(req, res){
        mongooseLib.findDocs(Rating, {account: req.cookies.accountID}, "rating", function(accountRating){
            var rating;
            if (accountRating.length > 0)
                rating = accountRating[0].rating;
            else
                rating = null;
            res.render("feedbackInput", {spaceID: req.params.spaceID, accountRating: rating});
        });
    });

    app.get("/feedback/:spaceID", function(req, res){
        mongooseLib.joinQuery(Comment, {space: req.params.spaceID}, "account comment", "account", "username", function(comments){
            mongooseLib.findDocs(Rating, {space: req.params.spaceID}, "account rating", function(ratings) {
                var ratingMap = new Map(ratings.map(i => [i.account.toString(), i.rating]));
                var feedbacks = [];
                var avg = 0;

                ratings.forEach(function(index){
                    avg += index.rating;
                });
                avg = avg / ratings.length;

                comments.forEach(function(index){
                    var feedback = {id: index._id, username: index.account.username, comment: index.comment};
                    feedback.rating = ratingMap.get(index.account._id.toString());
                    feedbacks.push(feedback);
                });

                res.render("feedback", {avg: avg, feedback: feedbacks, layout: false});
            });
        });
    });
}