const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading Story model...');

const Story = sequelize.define('Story', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
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
  image: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'stories',
  timestamps: true,
});

console.log('✅ Story model defined');

// Test connection and sync
Story.sync({ force: false })
  .then(() => {
    console.log('✅ Stories table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing Stories table:', error);
  });

module.exports = Story;