const express = require('express');
const router = express.Router();


// GET /api/v1/demo
router.get('/demo', async (req, res) => {
  try {
    res.json({ 
      success: true,
      message: 'Demo API is working!' 
    });
  } catch (error) {
    console.error('Demo API Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to process demo request',
      details: error.message 
    });
  }
});

module.exports = router;