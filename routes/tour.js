
const express = require('express');
const { saveTourInfo, addImageToTour, createVideoForTour } = require('../controllers/tour'); // Import your controller
const { getAllTours,getTourById } = require('../controllers/getTour');
const { getLatestTourByEmail } = require('../controllers/getTour');
const { getAllImagesFromTours,getAllImagesFromSpecificTours } = require('../controllers/images');
const { getVideoFromSpecificTour } = require('../controllers/video');
const Tour = require('../models/tourmodel');


const router = express.Router();
const { upload } = require('../config/cloudinary'); // Import the upload configuration
const fs = require('fs');
const path = require('path');

// Ensure the temp folder exists for local downloads
const tempDir = path.join(__dirname, '..', 'temp'); // Adjust path if needed
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Route to get all images from all tours
router.get('/images', getAllImagesFromTours);
router.get('/images/:id', getAllImagesFromSpecificTours);
router.get('/videos/:id', getVideoFromSpecificTour);
router.post('/tour', saveTourInfo);
router.get('/tour', getAllTours);
router.get('/tour/:id',getTourById);
router.post('/tour/uploadimage/:tourId', upload.single('image'), addImageToTour);
router.post('/tour/video/:id', createVideoForTour); // Add this line
router.get('/latest/:email', getLatestTourByEmail);
router.patch('/tour/:tourId/task-status', async (req, res) => {
    try {
        const { tourId } = req.params;
        const { dayIndex, taskIndex, newStatus } = req.body;

        // Update the specific task's status in the database
        const updatedTour = await Tour.findOneAndUpdate(
            { 
                _id: tourId,
                [`tourPlan.${dayIndex}.tasks.${taskIndex}`]: { $exists: true }
            },
            {
                $set: {
                    [`tourPlan.${dayIndex}.tasks.${taskIndex}.status`]: newStatus
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedTour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found or task does not exist'
            });
        }

        res.json({
            success: true,
            data: updatedTour
        });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update task status'
        });
    }
});


module.exports = router;
