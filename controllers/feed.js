var feedRouter = require("express").Router();
var db = require("../models")

feedRouter.route("/posts")
    .get(function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        db.Post.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

feedRouter.route("/posts")
    .delete(function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

module.exports = feedRouter;