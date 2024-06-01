const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MessageRecipient = sequelize.define('MessageRecipient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  recipientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  messageId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  indexes: [{
    fields: ['recipientId']
  }, {
    fields: ['messageId']
  }]
});

module.exports = MessageRecipient;