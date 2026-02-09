const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading NCRTSolution model...');

const NCRTSolution = sequelize.define('NCRTSolution', {
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
  tableName: 'ncrt_solutions',
  timestamps: true,
});

console.log('✅ NCRTSolution model defined');

// Test connection and sync
NCRTSolution.sync({ force: false })
  .then(() => {
    console.log('✅ NCRTSolutions table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing NCRTSolutions table:', error);
  });

module.exports = NCRTSolution;