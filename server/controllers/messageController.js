const { Message, ConversationMember } = require('../models');
const { messageSchema } = require('../validators/messageValidator');

exports.createMessage = async (req, res) => {
  try {
    const senderId = req.userId;

    const { value, error } = messageSchema.validate(req.body);

    if (error) {
      // FIXME: Error message might be not suitable for production
      return res.status(400).json({ error: error.details[0].message });
    }

    const { msgContent, conversationId } = value;

    const message = await Message.create({
      content: msgContent,
      senderId,
      conversationId
    });

    res.status(201).json({ message: 'Message created', data: message });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'User or conversation does not exist' });
    }

    res.status(500).json({ error: error.message });
  }
}

exports.retrieveMessagesFromConversation = async (req, res) => {
  try {
    const userId = req.userId;

    const { conversationId, limit } = req.params;

    const maxAuthorizedLimit = 50;

    let numericalLimit = parseInt(limit, 10);

    numericalLimit = isNaN(limit) || limit <= 0 ? maxAuthorizedLimit : Math.min(numericalLimit, maxAuthorizedLimit);

    const isUserInConversation = await ConversationMember.findOne({
      where: { conversationId, userId }
    })

    if (!isUserInConversation) {
      return res.status(403).json({ error: 'User is not part of this conversation' });
    }

    const messages = await Message.findAll({
      where: { conversationId },
      limit: numericalLimit,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// TODO: Delete message from conversation