const fs = require("fs");
const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Account} = require("../Schemas/Account.js");

module.exports = function (app) {
    app.post("/loginUser", function(req, res) {
        mongooseLib.findOne(Account, {username: req.body.username}, "-cancel -email -verification", function (user) {
            if (user == null)
                res.send({msg: "User not found"});
            else if (user.password != req.body.password)
                res.send({msg: "Password Incorrect"});
            else if (!(user.verified))
                res.send({msg: "User not verified"});
            else {
                res.cookie("accountID", user._id);
                res.send({msg: null});
            }
            res.end();
        });
    });

    app.get("/login", function(req, res) {
        fs.readFile("./html/login_page.html", function(err, data) {
            if (err) throw err;
            res.status = 200;
            res.set("Content-Type", "text/html");
            res.send(data);
            res.end();
        });
    });

    app.get("*/logout", function(req, res) {
        res.cookie("accountID", "");
        res.redirect("/login");
    });
}