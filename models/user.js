//npm package import, bcrypt does the encrypting for us
var bcrypt = require('bcrypt');

<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
          },
          password: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[8]

=======
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
>>>>>>> dev
            }
        }
    });

<<<<<<< HEAD
    User.associate = function(models) {
=======
    User.associate = function (models) {
>>>>>>> dev
        // add associations here
        // ex:User.hasMany(models.BlogPost);
    };
    //sequelize hook, will run before model instance is created and hash password
<<<<<<< HEAD
    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });
    
=======
    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

>>>>>>> dev

    return User;
};