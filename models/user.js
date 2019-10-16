//npm package import, bcrypt does the encrypting for us
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        DOB: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        q1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        a1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        q2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        a2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        q3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        a3: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Post);
        User.hasMany(models.Comment);
        // User.belongsToMany(models.Post, {
        //     through: 'User'
        //     // as: 'Attendee'
        // });
    };

    //sequelize hook, will run before model instance is created and hash password

    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};