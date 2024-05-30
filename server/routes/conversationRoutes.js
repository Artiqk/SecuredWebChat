const express = require('express');
const router = express.Router();
const { createDirectConversation, findConversationsByUsernames, findDirectConversation } = require('../controllers/conversationController');

router.post('/new', createDirectConversation);
router.get('/find/:userId/:otherUserId', findDirectConversation);

module.exports = router;