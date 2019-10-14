var express = require("express");
var router = express.Router();
var authRoutes = require('./authorization');

//appends "/auth/" to all routes imported from authorization.js
router.use('/auth',authRoutes);

router.get('/',function(req,res){
    res.render('index');
});
router.get('/liveFeed',function(req,res){
    res.render('liveFeed');
});

module.exports = router;
