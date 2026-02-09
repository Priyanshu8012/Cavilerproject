const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading SamplePaper model...');

const SamplePaper = sequelize.define('SamplePaper', {
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
  tableName: 'sample_papers',
  timestamps: true,
});

console.log('✅ SamplePaper model defined');

// Test connection and sync
SamplePaper.sync({ force: false })
  .then(() => {
    console.log('✅ SamplePapers table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing SamplePapers table:', error);
  });

module.exports = SamplePaper;