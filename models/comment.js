module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Comment.associate = function (models) {
        // We're saying that a Comment should belong to an Author
        // A Comment can't be created without an Author due to the foreign key constraint
        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Post);
    };

    return Comment;
};