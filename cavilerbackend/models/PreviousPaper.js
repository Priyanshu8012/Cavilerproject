const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading PreviousPaper model...');

const PreviousPaper = sequelize.define('PreviousPaper', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  course: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  year: { 
    type: DataTypes.STRING(10), 
    allowNull: false 
  },
  filename: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  originalName: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  filePath: { 
    type: DataTypes.STRING(500), 
    allowNull: false 
  },
  fileSize: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  url: { 
    type: DataTypes.STRING(500), 
    allowNull: false 
  }
}, {
  tableName: 'previous_papers',
  timestamps: true,
});

console.log('✅ PreviousPaper model defined');

// Test connection and sync
PreviousPaper.sync({ force: false })
  .then(() => {
    console.log('✅ PreviousPapers table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing PreviousPapers table:', error);
  });

module.exports = PreviousPaper;