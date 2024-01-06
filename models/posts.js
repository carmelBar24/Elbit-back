const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');
const Comments = require('./comments');
const Likes=require('./likes');

const Posts= sequelize.define('Posts', {
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    postText: {
        type: DataTypes.STRING,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
});

Posts.hasMany(Comments,{
    as:'comments',
    onDelete:"cascade"
});

Posts.hasMany(Likes,{
    as:'likes',
    onDelete:"cascade"
})

module.exports = Posts;
