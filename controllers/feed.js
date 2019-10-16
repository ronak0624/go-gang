var feedRouter = require("express").Router();

feedRouter.route("/posts")
    .post(function(req,res) {
        console.log("post request made")
    })

module.exports = feedRouter;