const Tour = require('../models/tourmodel');

const getAllImagesFromTours = async () => {
    try {
        // Fetch all tours from the database
        const tours = await Tour.find({}, 'album'); // Only retrieve the album field

        // Extract images from each tour and return them
        return tours.flatMap(tour => tour.album);
    } catch (error) {
        console.error('Error in getAllImagesFromTours:', error);
        throw error;
    }
};

const getAllImagesFromSpecificTours = async (id) => {
    try {
        // Fetch the specific tour from the database
        const tour = await Tour.findById(id, 'album'); // Only retrieve the album field

        // Check if the tour exists
        if (!tour) {
            throw new Error('Tour not found');
        }

        // Return images from the tour
        return tour.album;
    } catch (error) {
        console.error('Error in getAllImagesFromSpecificTours:', error);
        throw error;
    }
};

module.exports = { getAllImagesFromTours, getAllImagesFromSpecificTours };