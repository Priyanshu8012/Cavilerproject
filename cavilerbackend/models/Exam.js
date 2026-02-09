const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exam = sequelize.define('Exam', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  date: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  daysLeft: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  icon: { 
    type: DataTypes.STRING, 
    allowNull: false,
    defaultValue: 'FaBook'
  },
  color: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('Upcoming', 'Approaching', 'Registration Open', 'Completed'),
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  students: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  priority: { 
    type: DataTypes.ENUM('High', 'Medium', 'Low'),
    allowNull: false 
  },
  category: { 
    type: DataTypes.ENUM('Engineering', 'Medical', 'Board', 'Scholarship'),
    allowNull: false 
  },
  registrationDeadline: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  syllabus: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  fee: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  website: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
}, {
  tableName: 'exams',
  timestamps: true,
});

module.exports = Exam;