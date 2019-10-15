var express = require("express");
var router = express.Router();
var authRoutes = require('./authorization');

//appends "/auth/" to all routes imported from authorization.js
router.use('/auth', authRoutes);

router.get('/', function (req, res) {
    res.render('index')
})
router.get('/signup', function (req, res) {
    res.render('signUp')
})
router.get('/catagories', function (req, res) {
    res.render('catagories')
})

module.exports = router;
