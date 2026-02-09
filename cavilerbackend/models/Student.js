const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading Student model...');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  achievement: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  course: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  photo: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'students',
  timestamps: true,
});

console.log('✅ Student model defined');

// Test connection and sync
Student.sync({ force: false })
  .then(() => {
    console.log('✅ Students table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing Students table:', error);
  });

module.exports = Student;