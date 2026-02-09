const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading Enrollment model...');

const Enrollment = sequelize.define('Enrollment', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  fullName: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  phone: { 
    type: DataTypes.STRING(20), 
    allowNull: false 
  },
  course: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  enrollmentDate: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  notes: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'enrollments',
  timestamps: true,
});

console.log('✅ Enrollment model defined');

// Test connection and sync
Enrollment.sync({ force: false })
  .then(() => {
    console.log('✅ Enrollments table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing Enrollments table:', error);
  });

module.exports = Enrollment;