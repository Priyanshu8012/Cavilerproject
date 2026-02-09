const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

console.log('🔁 Loading message routes...');

// GET /api/messages - Get all messages (optional, for admin)
router.get('/messages', (req, res, next) => {
  console.log('📍 GET /api/messages route hit');
  messageController.getMessages(req, res, next);
});

// POST /api/messages - Create new message
router.post('/messages', (req, res, next) => {
  console.log('📍 POST /api/messages route hit', { body: req.body });
  messageController.createMessage(req, res, next);
});

// DELETE /api/messages/:id - Delete message (optional, for admin)
router.delete('/messages/:id', (req, res, next) => {
  console.log('📍 DELETE /api/messages/:id route hit', { id: req.params.id });
  messageController.deleteMessage(req, res, next);
});

console.log('✅ Message routes loaded successfully');
module.exports = router;