const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Counselor = sequelize.define('Counselor', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  designation: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  qualification: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  experience: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  photo: { 
    type: DataTypes.STRING(500), 
    allowNull: true 
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  specialties: {
    type: DataTypes.JSON,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'counselors',
  timestamps: true,
});

module.exports = Counselor;