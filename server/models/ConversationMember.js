const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const ConversationMembers = sequelize.define('ConversationMember', {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false
  },
  conversationId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'conversations',
      key: 'id'
    },
    allowNull: false
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = ConversationMembers;