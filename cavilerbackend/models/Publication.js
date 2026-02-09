const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publication = sequelize.define('Publication', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  title: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  price: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  originalPrice: { 
    type: DataTypes.STRING(100), 
    allowNull: true 
  },
  type: { 
    type: DataTypes.ENUM('formula', 'notes', 'test', 'premium'), 
    allowNull: false 
  },
  features: { 
    type: DataTypes.JSON, 
    allowNull: false 
  },
  gradient: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  bgGradient: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'publications',
  timestamps: true,
});

module.exports = Publication;