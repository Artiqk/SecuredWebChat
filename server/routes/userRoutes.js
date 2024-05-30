const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserByUsername, getUserById } = require('../controllers/userController');

router.post('/new', createUser);
router.get('/fetch', getAllUsers);
router.get('/fetch/:username', getUserByUsername);
router.get('/fetch/:userId', getUserById);

module.exports = router;