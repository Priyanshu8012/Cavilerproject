const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading TeacherJob model...');

const TeacherJob = sequelize.define('TeacherJob', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
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
  degree: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  subject: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  experience: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  message: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  }
}, {
  tableName: 'teacher_jobs',
  timestamps: true,
});

console.log('✅ TeacherJob model defined');

// Test connection and sync
TeacherJob.sync({ force: false })
  .then(() => {
    console.log('✅ TeacherJobs table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing TeacherJobs table:', error);
  });

module.exports = TeacherJob;