// Function to get all images from all tours
const Tour = require('../models/tourmodel');

const getAllImagesFromTours = async (req, res) => {
    try {
        // Fetch all tours from the database
        const tours = await Tour.find({}, 'album'); // Only retrieve the album field

        // Extract images from each tour
        const allImages = tours.flatMap(tour => tour.album);

        // Send the response
        res.status(200).json({
            success: true,
            message: 'Images retrieved successfully',
            data: allImages
        });
    } catch (error) {
        console.error('Error in getAllImagesFromTours:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving images',
            error: error.message
        });
    }
};

const getAllImagesFromSpecificTours = async (req, res) => {
    try {
        const { id } = req.params; // Get tour ID from request parameters

        // Fetch the specific tour from the database
        const tour = await Tour.findById(id, 'album'); // Only retrieve the album field

        // Check if the tour exists
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        // Extract images from the tour
        const allImages = tour.album;

        // Send the response
        res.status(200).json({
            success: true,
            message: 'Images retrieved successfully',
            data: allImages
        });
    } catch (error) {
        console.error('Error in getAllImagesFromSpecificTours:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving images',
            error: error.message
        });
    }
};


module.exports = { getAllImagesFromTours,getAllImagesFromSpecificTours }; // Ensure to export the function
