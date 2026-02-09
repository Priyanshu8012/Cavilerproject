const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
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
    allowNull: false 
  },
  category: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  image_url: { 
    type: DataTypes.STRING(500), 
    allowNull: true 
  },
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  read_time: { 
    type: DataTypes.STRING(50), 
    allowNull: true 
  },
  status: { 
    type: DataTypes.ENUM('draft', 'published'), 
    defaultValue: 'draft' 
  },
  tags: { 
    type: DataTypes.TEXT, 
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value));
    }
  }
}, {
  tableName: 'blogs',
  timestamps: true,
});

module.exports = Blog;