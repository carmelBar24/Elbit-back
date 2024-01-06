const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');
const Posts=require('./posts')
const Likes = require("./likes");


const Users= sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
});


Users.hasMany(Likes,{
    as:'likes',
    onDelete:"cascade"
})

Users.hasMany(Posts,{
    as:'posts',
    onDelete:"cascade"
})


module.exports = Users;
