const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');

const Likes= sequelize.define('Likes');

module.exports = Likes;