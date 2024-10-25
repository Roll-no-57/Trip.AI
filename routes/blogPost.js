const express = require('express');
const router = express.Router();
const { fetchImageAndUpload } = require('../fbPost/FBpost');

// POST /api/v1/searchImage directly sending result
router.post('/blogPost/:id', async (req, res) => {
    try {
        // const id = req.params.id;
        // const getBlog = await Blog.findById(id);
        // const url = getBlog.image;
        // fetchImageAndUpload(url, getBlog);

    } catch (error) {
        console.error('Error during direct semantic search:', error);
        res.status(500).json({ success: false, message: 'Error performing semantic search.' });
    }
});

module.exports = router;