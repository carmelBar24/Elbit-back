const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');
const Posts =require('./posts');

const Comments= sequelize.define('Comments', {
    commentBody: {
        type: DataTypes.STRING,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    }

});

module.exports = Comments;