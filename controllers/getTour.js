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


async function getTourById(id){
    try {
         // Extract the tour ID from the request parameters
        const tour = await Tour.findById(id);

        // res.status(200).json({ success: true, data: tour });
        return tour;
    } catch (error) {
        console.log("Error in fetching tour:", error);
        res.status(500).json({ success: false, message: "Server Error!" });
    }
};

module.exports = { getAllTours, getTourById }; // Ensure to export the function
