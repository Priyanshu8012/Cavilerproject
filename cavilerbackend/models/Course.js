const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading Course model...');

const Course = sequelize.define('Course', {
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
  price: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  duration: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'courses',
  timestamps: true,
});

console.log('✅ Course model defined');

Course.sync({ force: false })
  .then(() => {
    console.log('✅ Courses table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing Courses table:', error);
  });

module.exports = Course;