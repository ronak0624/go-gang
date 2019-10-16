var feedRouter = require("express").Router();
var db = require("../models")

feedRouter.route("/posts")
    .post(function (req, res) {
        console.log("post request made")
        db.Post.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    .get(function (req, res) {
        var query = {};
        if (req.query.author_id) {
            query.UserId = req.query.user_id;
        }
        db.Post.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    })
    .put(function (req, res) {
        //update
    })
    .delete(function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    })
module.exports = feedRouter;