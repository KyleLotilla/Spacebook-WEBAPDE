const crypto = require("crypto");
const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Account} = require("../Schemas/Account.js");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const fs = require("fs");

module.exports = function (app) {
    app.post("/registerAccount", function (req, res){
        var timeStamp = (Date.now()).toString();
        var random = Math.random().toString();
        var hmac = crypto.createHmac("sha1", "webapde");
        hmac.update(timeStamp + random);
        var hash = hmac.digest("hex");
        
        var account = new Account({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            verification: hash,
            verified: false,
            cancel: 2
        });

        mongooseLib.saveDoc(account, function(newAccount){
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                service: "gmail",
                auth: {
                    user: "webapdex22@gmail.com",
                    pass: "$paceb00k"
                }
            });
        
            transporter.use("compile", hbs({viewEngine: {layoutsDir: "./views/layouts/", partialsDir: "./views/partials/"}, viewPath: "./views/"}));
        
            var mailOptions = {
                from: 'Spacebook <webapdex22@gmail.com>',
                to: req.body.email,
                subject: "SpaceBook Account Verification",
                template: "emailVerification",
                context: {
                    username: req.body.username,
                    hash: hash
                }
            };
        
            transporter.sendMail(mailOptions, function(err, info){
                if (err) throw err;
                res.end();
            });
        });
    });
    
    app.get("/register", function(req, res) {
        fs.readFile("./html/register.html", function(err, data){
            res.status = 200;
            res.set("Content-Type", "text/html");
            res.send(data);
            res.end();
        });
    });
}