// routes/chat.js
const express = require('express');
const router = express.Router();
const { handleChatRequest } = require('../controllers/chat');

// POST /api/v1/chat
router.post('/chat', async (req, res) => {
  try {
    const response = await handleChatRequest(req.body);
    res.json({ 
      success: true,
      response: response 
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to process chat request',
      details: error.message 
    });
  }
});

module.exports = router;
