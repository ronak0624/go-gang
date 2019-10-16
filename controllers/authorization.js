var express = require("express");
var router = express.Router();
var db = require('../models');
const bcrypt = require('bcrypt');

//get route for secret clubhouse, if logged in will elt you in, otherwise will fail
router.get('/secret', function (req, res) {
    if (req.session.user) {
        res.render('securepage', req.session.user);
    } else {
        res.send("You're not logged in!");
    }
})
//get route to retrieve all users info, only for dev, remove from production
router.get('/allUsers', function (req, res) {
    db.User.findAll().then(function (users) {
        res.json(users);
    })
})

//loads signup form
router.get('/signUp', function (req, res) {
    res.render('signUp');
})

//creates new instance of user
router.post('/signUp', function (req, res) {
    console.log('auth req.body', req.body)
    db.User.create({
        name: req.body.name,
        username:req.body.username,
        password: req.body.password,
        DOB: req.body.DOB,
        q1: req.body.q1,
        a1: req.body.a1,
        q2: req.body.q2,
        a2: req.body.a2,
        q3: req.body.q3,
        a3: req.body.a3
    }).then(function (newUser) {
        console.log(newUser)
        res.json(newUser);
        // res.redirect('/auth/login')
    })
})

//loads login form
router.get('/login', function (req, res) {
    res.render('login')
})

//route for user login
router.post('/login', function (req, res) {
    db.User.findOne({
        where: {
            name: req.body.name
        }
    }).then(function (dbUser) {
        //compares password send in req.body to one in database, will return true if matched.
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            //create new session property "user", set equal to logged in user
            req.session.user = dbUser
        }
        else {
            //delete existing user, add error
            req.session.user = false;
            req.session.error = 'auth failed bro'
        }
        res.json(req.session);
    })
})

router.get('/logout', function (req, res) {
    //delete session user, logging you out
    req.session.destroy(function () {
        res.send('successfully logged out')
    })
})

//developer route to see all the session variables.
router.get('/readsessions', function (req, res) {
    res.json(req.session);
})

module.exports = router;