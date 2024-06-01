const express = require('express');
const router = express.Router();
const { createMessage, retrieveMessages } = require('../controllers/messageController');

router.post('/new', createMessage);

// FIXME: remove conversationId
router.get('/fetch/:conversationId/:limit', retrieveMessages);

module.exports = router;