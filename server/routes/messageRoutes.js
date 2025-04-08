// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const messageController = require('../controllers/messageController');

router.post('/send', auth, messageController.sendMessage);
router.get('/:groupId', auth, messageController.getMessagesByGroup);

module.exports = router;