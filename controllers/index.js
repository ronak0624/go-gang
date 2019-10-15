var express = require("express");
var router = express.Router();
var db = require("../models");
var authRoutes = require('./authorization');

//appends "/auth/" to all routes imported from authorization.js
router.use('/auth',authRoutes);

router.get('/',function(req,res){
    res.render('index');
});

router.post('/createPost',function(req,res){
    console.log(req.body);
    db.Post.create({
        title: req.body.title,
        body: req.body.body,
        location: req.body.location,
        category: req.body.category,
        date: req.body.date
    }).then(function(newPost){
        console.log(newPost)
        res.json(newPost);
    })
});

module.exports = router;
