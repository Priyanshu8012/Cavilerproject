const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading RevisionNote model...');

const RevisionNote = sequelize.define('RevisionNote', {
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
  tableName: 'revision_notes',
  timestamps: true,
});

console.log('✅ RevisionNote model defined');

// Test connection and sync
RevisionNote.sync({ force: false })
  .then(() => {
    console.log('✅ RevisionNotes table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing RevisionNotes table:', error);
  });

module.exports = RevisionNote;