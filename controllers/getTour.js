const Tour = require('../models/tourmodel');
const mongoose = require('mongoose')

const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        console.log("Error in fetching tours:", error);
        res.status(500).json({ success: false, message: "Server Error!" });
    }
};


const getTourById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the tour ID from the request parameters
        const tour = await Tour.findById(id);

        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }

        res.status(200).json({ success: true, data: tour });
    } catch (error) {
        console.log("Error in fetching tour:", error);
        res.status(500).json({ success: false, message: "Server Error!" });
    }
};

module.exports = { getAllTours, getTourById }; // Ensure to export the function
