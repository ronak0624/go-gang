var express = require("express");
var router = express.Router();
//var htmlPages = require("../views")

router.get("/", function (req, res) {
    res.send("this will be our title page");
})

router.get("/catagories", function (req, res) {
    res.send("this will be our catagories page");
 
})

router.get("/signUp", function (req, res) {
    res.send("this will be our sign up page")
})

router.get("/liveFeed", function (req, res) {
    res.send("this will be our live feed")
})



//Exports routes for server.js to use
module.exports = router;