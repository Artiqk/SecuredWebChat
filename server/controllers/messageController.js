const { Message, ConversationMember, MessageRecipient } = require('../models');
const { messageSchema } = require('../validators/messageValidator');

exports.createMessage = async (req, res) => {
  try {
    const creatorId = req.userId;

    const { value, error } = messageSchema.validate(req.body);

    if (error) {
      // FIXME: Error message might be not suitable for production
      return res.status(400).json({ error: error.details[0].message });
    }

    const { body, recipientId } = value;

    const message = await Message.create({
      body,
      creatorId
    });

    const messageRecipient = await MessageRecipient.create({
      recipientId,
      messageId: message.id
    });

    res.status(201).json({ message: 'Message created', data: { message, messageRecipient } });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'User or conversation does not exist' });
    }

    res.status(500).json({ error: error.message });
  }
}

// FIXME: Rework this function to adapt it to the new database design
exports.retrieveMessages = async (req, res) => {
  try {
    const userId = req.userId;

    const { conversationId, limit } = req.params;

    const maxAuthorizedLimit = 50;

    let numericalLimit = parseInt(limit, 10);

    numericalLimit = isNaN(limit) || limit <= 0 ? maxAuthorizedLimit : Math.min(numericalLimit, maxAuthorizedLimit);

    // TODO: Check if messages exist between 2 users

    // TODO: Retrieve all messages between the 2 users

    // const messages = await Message.findAll({
    //   where: { conversationId },
    //   limit: numericalLimit,
    //   order: [['createdAt', 'DESC']]
    // });

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// TODO: Delete message from conversation