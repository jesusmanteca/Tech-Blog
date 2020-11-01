//from sequelize, we'll use the Model and DataTypes programs/functions from sequelize library
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
// to plug api to command together well, we'll use a common language through Model
class Comment extends Model {}
// for all comments, we'll allow string to be however long (not recommended for real life apps)
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;
