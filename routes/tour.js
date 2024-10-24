
const express = require('express');
const { saveTourInfo, addImageToTour, createVideoForTour } = require('../controllers/tour'); // Import your controller
const { getAllTours,getTourById } = require('../controllers/getTour');
const { getAllImagesFromTours,getAllImagesFromSpecificTours } = require('../controllers/images');
const { getVideoFromSpecificTour } = require('../controllers/video');

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
router.post('/tour/:tourId/upload-image', upload.single('image'), addImageToTour);
router.post('/tour/:id/video', createVideoForTour); // Add this line


module.exports = router;
