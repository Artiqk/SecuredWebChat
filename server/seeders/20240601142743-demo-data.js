'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        id: uuidv4(),
        username: 'funny_monkey',
        password: await bcrypt.hash('banana123', saltRounds),
        publicKey: 'public_key_monkey',
        encryptedPrivateKey: 'encrypted_private_key_monkey',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'silly_elephant',
        password: await bcrypt.hash('trumpet456', saltRounds),
        publicKey: 'public_key_elephant',
        encryptedPrivateKey: 'encrypted_private_key_elephant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'crazy_koala',
        password: await bcrypt.hash('eucalyptus789', saltRounds),
        publicKey: 'public_key_koala',
        encryptedPrivateKey: 'encrypted_private_key_koala',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const messages = [
      {
        id: uuidv4(),
        body: 'Hello from the jungle!',
        creatorId: users[0].id,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        body: 'Watch out for the lion!',
        creatorId: users[1].id,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        body: 'Let s have a tree-top meeting.',
        creatorId: users[2].id,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        body: 'Do you like bananas?',
        creatorId: users[0].id,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        body: 'Trunks up!',
        creatorId: users[1].id,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const messageRecipients = [
      {
        id: uuidv4(),
        recipientId: users[0].id,
        messageId: messages[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        recipientId: users[1].id,
        messageId: messages[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        recipientId: users[2].id,
        messageId: messages[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        recipientId: users[0].id,
        messageId: messages[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        recipientId: users[1].id,
        messageId: messages[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Messages', messages, {});
    await queryInterface.bulkInsert('MessageRecipients', messageRecipients, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MessageRecipients', null, {});
    await queryInterface.bulkDelete('Messages', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
