const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  title: { 
    type: DataTypes.STRING(500), 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  category: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  file_url: { 
    type: DataTypes.STRING(500), 
    allowNull: true 
  },
  youtube_url: { 
    type: DataTypes.STRING(500), 
    allowNull: true 
  },
  content_type: { 
    type: DataTypes.ENUM('image', 'video', 'youtube'), 
    allowNull: false 
  },
  file_size: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
  },
  file_name: { 
    type: DataTypes.STRING(255), 
    allowNull: true 
  },
  thumbnail_url: { 
    type: DataTypes.STRING(500), 
    allowNull: true 
  },
  status: { 
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'), 
    defaultValue: 'pending' 
  },
  upload_progress: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
  }
}, {
  tableName: 'contents',
  timestamps: true,
});

module.exports = Content;