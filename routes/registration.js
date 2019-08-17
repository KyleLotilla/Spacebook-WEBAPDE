const crypto = require("crypto");
const mongooseLib = require("../serverLibs/mongooseLib.js");
const {Account} = require("../Schemas/Account.js");
const nodemailer = require("nodemailer");

module.exports = function (app) {
    app.post("/registerAccount", function (req, res){
        var timeStamp = (Date.now()).toString;
        var random = Math.random().toString;
        var hmac = crypto.createHmac("sha1", "webapde");
        hmac.update(timeStamp + random);
        var hash = hmac.digest("hex");
        
        var account = new Account({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            verification: hash,
            cancel: 2
        });

        mongooseLib.saveLib(account, function(){});
    });
    
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

    
    var mailOptions = {
        from: 'Spacebook <webapdex22@gmail.com>',
        to: 'webapdex22@gmail.com',
        subject: 'AXETTE',
        text: 'COLORS WEAVE'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}