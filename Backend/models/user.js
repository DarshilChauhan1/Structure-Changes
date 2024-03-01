const Sequelize = require('sequelize');
const sequelize = require('../utils/databse');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  ispremiumuser: Sequelize.BOOLEAN,
});

module.exports = User;
