const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading ImportantQuestion model...');

const ImportantQuestion = sequelize.define('ImportantQuestion', {
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
  tableName: 'important_questions',
  timestamps: true,
});

console.log('✅ ImportantQuestion model defined');

// Test connection and sync
ImportantQuestion.sync({ force: false })
  .then(() => {
    console.log('✅ ImportantQuestions table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing ImportantQuestions table:', error);
  });

module.exports = ImportantQuestion;