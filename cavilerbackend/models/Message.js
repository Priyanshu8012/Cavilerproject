const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('🔁 Loading Message model...');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'General Enquiry'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: DataTypes.ENUM('new', 'read', 'replied'),
    defaultValue: 'new'
  }
}, {
  tableName: 'messages',
  timestamps: true,
});

console.log('✅ Message model defined');

Message.sync({ force: false })
  .then(() => {
    console.log('✅ Messages table synced successfully');
  })
  .catch(error => {
    console.error('❌ Error syncing Messages table:', error);
  });

module.exports = Message;