const express = require('express');
const router = express.Router();
const { getTourById } = require('../controllers/getTour');
const { describeImage } = require('../AI-models/generateDescription');
const { handleChatRequest } = require('../controllers/chat');


// POST /api/v1/searchImage directly sending result
router.post('/blog/:id', async (req, res) => {
    try {

        const tour = await getTourById(req.params.id);
        const images = tour.album;

        // Prepare an array to store the image descriptions

        let description = ""
        for (const url of images) {

            console.log(url.url);
            const des = await describeImage(url); // Call function to describe the image
            console.log(des);
            description = description + des;
            // Save the URL and description as a string

        }
        console.log(description);

        // Prepare the prompt for chatbot
        const prompt = "You are a professional travel blogger . now write a travel blog about the trip described in the images  {description} . just give me the ans in plain text . no json or special characters .";
        const response = await handleChatRequest(prompt);
        

        // Send the result directly as the response
        res.status(200).json({ success: true, data: response });  // Only the result is returned
    } catch (error) {
        console.error('Error during direct semantic search:', error);
        res.status(500).json({ success: false, message: 'Error performing semantic search.' });
    }
});

module.exports = router;