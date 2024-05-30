const User = require('./User');
const Message = require('./Message');
const Conversation = require('./Conversation');
const ConversationMember = require('./ConversationMember');

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

Conversation.hasMany(Message, { foreignKey: 'conversationId' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

User.belongsToMany(Conversation, { through: ConversationMember, foreignKey: 'userId' });
Conversation.belongsToMany(User, { through: ConversationMember, foreignKey: 'conversationId' });

ConversationMember.belongsTo(User, { foreignKey: 'userId' });
ConversationMember.belongsTo(Conversation, { foreignKey: 'conversationId' });

module.exports = {
  User,
  Message,
  Conversation,
  ConversationMember
};