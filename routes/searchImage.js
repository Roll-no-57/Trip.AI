const express = require('express');
const router = express.Router();
const { CreteImageDesc } = require('../controllers/generateALLDescription');
const { main } = require('../AI-models/ragImage');



// POST /api/v1/searchImage directly sending result
router.post('/searchImage', async (req, res) => {
    try {
        // Generate image descriptions
        await CreteImageDesc();

        // Get the query from the request body
        const { query } = req.body;

        // Perform the main search using the query
        const result = await main(query);

        // Send the result directly as the response
        res.status(200).json({ success: true, data: result });  // Only the result is returned
    } catch (error) {
        console.error('Error during direct semantic search:', error);
        res.status(500).json({ success: false, message: 'Error performing semantic search.' });
    }
});

module.exports = router;
