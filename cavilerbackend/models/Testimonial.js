const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading Testimonial model...');

const Testimonial = sequelize.define('Testimonial', {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    primaryKey: true, 
    autoIncrement: true 
  },
  youtubeLink: { 
    type: DataTypes.STRING(500), 
    allowNull: false 
  },
  candidateName: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  ranking: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  year: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  }
}, {
  tableName: 'testimonials',
  timestamps: true,
});

console.log('✅ Testimonial model defined');

// Test connection and sync
Testimonial.sync({ force: false })
  .then(() => {
    console.log('✅ Testimonials table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing Testimonials table:', error);
  });

module.exports = Testimonial;