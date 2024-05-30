const sequelize = require('../config/database');
const { User, Conversation, ConversationMember } = require('../models');
const { Sequelize } = require('sequelize');

exports.createDirectConversation = async (req, res) => {
  try {
    const { otherUserId } = req.body;

    const userId = req.userId;

    const transaction = await sequelize.transaction();

    const usersExists = await User.count({
      where: {
        id: {
          [Sequelize.Op.in]: [userId, otherUserId]
        }
      }
    }).then(count => count === 2);

    if (!usersExists) {
      return res.status(400).json({ error: `One or more users don't exist` });
    }

    const users = [userId, otherUserId];

    const newConversation = await Conversation.create();

    await Promise.all(users.map(userId =>
      ConversationMember.create({
        userId: userId,
        conversationId: newConversation.id
      })
    ));

    const usernames = await Promise.all(users.map(userId =>
      User.findOne({
        where: { id: userId },
        attributes: ['username']
      })
    ));

    // Apply the changes to the database
    await transaction.commit();

    res.status(201).json({
      message: 'Conversation created successfully',
      conversationId: newConversation.id,
      participants: usernames.map(user => user.username)
    });
  } catch (error) {
    // Undo all changes to database if an error occurs
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
}

exports.findDirectConversation = async (req, res) => {
  try {
    const { otherUserId } = req.params;

    const userId = req.userId;

    const usersExists = await User.count({
      where: {
        id: {
          [Sequelize.Op.in]: [userId, otherUserId]
        }
      }
    }).then(count => count === 2);

    if (!usersExists) {
      return res.status(400).json({ error: `One or more users don't exist` });
    }

    const conversation = await Conversation.findOne({
      include: [{
        model: User,
        where: {
          id: {
            [Sequelize.Op.in]: [userId, otherUserId]
          }
        },
        attributes: ['id']
      }]
    });

    res.status(200).json({ data: conversation.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// TODO: List conversation of a user