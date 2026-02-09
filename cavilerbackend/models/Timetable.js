const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Timetable = sequelize.define('Timetable', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  subject: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  code: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  time: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  duration: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  venue: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  type: { 
    type: DataTypes.ENUM('Theory', 'Practical'), 
    defaultValue: 'Theory' 
  },
  status: { 
    type: DataTypes.ENUM('upcoming', 'completed'), 
    defaultValue: 'upcoming' 
  },
}, {
  tableName: 'timetables',
  timestamps: true,
});

module.exports = Timetable;