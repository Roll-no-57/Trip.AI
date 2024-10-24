// Function to get video from a specific tour by ID
const Tour = require('../models/tourmodel');

const getVideoFromSpecificTour = async (req, res) => {
    try {
        const { id } = req.params; // Get tour ID from request parameters

        // Fetch the specific tour from the database
        const tour = await Tour.findById(id, 'tourVideo'); // Only retrieve the tourVideo field

        // Check if the tour exists
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        // Extract video from the tour
        const video = tour.tourVideo;

        // Send the response
        res.status(200).json({
            success: true,
            message: 'Video retrieved successfully',
            data: video
        });
    } catch (error) {
        console.error('Error in getVideoFromSpecificTour:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving video',
            error: error.message
        });
    }
};

module.exports = { getVideoFromSpecificTour }; // Ensure to export the function
