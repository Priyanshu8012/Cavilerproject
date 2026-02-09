// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  resetToken: { type: DataTypes.STRING, allowNull: true },
  resetTokenExpiry: { type: DataTypes.BIGINT, allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
