const User = require('./User');
const Message = require('./Message');
const MessageRecipient = require('./MessageRecipient');

User.hasMany(Message, { foreignKey: 'creatorId' });
Message.belongsTo(User, { foreignKey: 'creatorId' });

Message.hasMany(Message, { as: 'Replies', foreignKey: 'parentId' });
Message.belongsTo(Message, { as: 'Parent', foreignKey: 'parentId' });

User.hasMany(MessageRecipient, { foreignKey: 'recipientId' });
MessageRecipient.belongsTo(User, { foreignKey: 'recipientId' });

Message.hasMany(MessageRecipient, { foreignKey: 'messageId' });
MessageRecipient.belongsTo(Message, { foreignKey: 'messageId' });

module.exports = {
  User,
  Message,
  MessageRecipient
};