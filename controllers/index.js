var express = require("express");
var router = express.Router();
var db = require("../models");
var authRoutes = require('./authorization');
var feedRouter = require ('./feed')

//appends "/auth/" to all routes imported from authorization.js
router.use('/auth', authRoutes);
router.use('/api', feedRouter);

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
router.get('/', function (req, res) {
    res.render('index')
})
router.get('/signup', function (req, res) {
    res.render('signUp')
})
router.get('/categories', function (req, res) {
    res.render('categories')
})
router.get('/livefeed', function (req, res) {
    res.render('liveFeed')
})
router.get('/login', function (req, res) {
    res.render('login')
})

module.exports = router;