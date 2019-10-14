var express = require("express");

var router = express.Router();

router.get("/api/liveFeed", function(req,res){
    res.jason()
    res.send("this will send live feed data");
})


//Exports routes for server.js to use
module.exports = router;