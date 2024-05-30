const express = require('express');
const router = express.Router();
const { createMessage, retrieveMessagesFromConversation } = require('../controllers/messageController');

router.post('/new', createMessage);
router.get('/fetch/:conversationId/:limit', retrieveMessagesFromConversation);

module.exports = router;