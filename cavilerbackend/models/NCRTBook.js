const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading NCRTBook model...');

const NCRTBook = sequelize.define('NCRTBook', {
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
  tableName: 'ncrt_books',
  timestamps: true,
});

console.log('✅ NCRTBook model defined');

// Test connection and sync
NCRTBook.sync({ force: false })
  .then(() => {
    console.log('✅ NCRTBooks table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing NCRTBooks table:', error);
  });

module.exports = NCRTBook;