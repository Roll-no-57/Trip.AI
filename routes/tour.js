// const express = require('express');
// const { saveTourInfo, addImageToTour } = require('../controllers/tour'); // Import your controller
// const router = express.Router();
// const { upload } = require('../config/cloudinary'); // Import the upload configuration

// // Route to save tour information
// router.post('/tour', saveTourInfo);

// // Route to upload image to a tour
// router.post('/tour/:tourId/upload-image', upload.single('image'), addImageToTour); // Use the addImageToTour controller

// router.post('/tour/:tourId/')

// module.exports = router;
const express = require('express');
const { saveTourInfo, addImageToTour, createVideoForTour } = require('../controllers/tour'); // Import your controller
// const { getTourById, getAllTours } = require('../controllers/getTour'); // Import your controller
const router = express.Router();
const { upload } = require('../config/cloudinary'); // Import the upload configuration
const fs = require('fs');
const path = require('path');

// Ensure the temp folder exists for local downloads
const tempDir = path.join(__dirname, '..', 'temp'); // Adjust path if needed
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Existing routes
router.post('/tour', saveTourInfo);

// router.get('/tour/:tourId', getTourById);
// route.get('/tour', getAllTours);


router.post('/tour/:tourId/upload-image', upload.single('image'), addImageToTour);

// New route for generating video
router.post('/tour/:id/video', createVideoForTour); // Add this line

module.exports = router;
