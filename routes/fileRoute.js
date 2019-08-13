const express = require("express");
const fs = require("fs");
const path = require("path");

module.exports = function (app) {
    app.use("/html", express.static("html"));
    app.use("/css", express.static("css"));
    app.use("/libs", express.static("libs"));
    app.use("/fontawesome", express.static("fontawesome"));
    app.use("/images", express.static("images"));
    app.use("/logos", express.static("logos"));
    app.use("/fonts", express.static("fonts"));
}