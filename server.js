var express = require("express");
const path = require('path');
var app = express();
app.use(express.static("app"));
app.get("/command", function (req, res,next) {
 //res.redirect("/"); 
 res.sendFile(path.join(__dirname + '/command/index.html'));
});
app.get("/dispatcher", function (req, res,next) {
 //res.redirect("/"); 
 res.sendFile(path.join(__dirname + '/dispatcher/index.html'));
});
app.get("/redux", function (req, res,next) {
 //res.redirect("/"); 
 res.sendFile(path.join(__dirname + '/redux/index.html'));
});
app.listen(8080, "localhost");