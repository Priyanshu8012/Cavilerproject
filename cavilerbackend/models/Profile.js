const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading Profile model...');

const Profile = sequelize.define('Profile', {
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
  post: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  education: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  experience: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  achievements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  photo: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'profiles',
  timestamps: true,
});

console.log('✅ Profile model defined');

Profile.sync({ force: false })
  .then(() => {
    console.log('✅ Profiles table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing Profiles table:', error);
  });

module.exports = Profile;