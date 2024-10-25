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



const getLatestTourByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Get email from URL parameters
        
        // Find all tours for the email and sort by _id in descending order
        // Limit to 1 to get only the latest tour
        const latestTour = await Tour.findOne({ email })
            .sort({ _id: -1 })
            .limit(1);

        if (!latestTour) {
            return res.status(404).json({ 
                success: false, 
                message: 'No tours found for this email' 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: latestTour 
        });
    } catch (error) {
        console.log("Error in fetching latest tour:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error!" 
        });
    }
};

const getUserTours = async (req, res) => {
    try {
      const { email } = req.params;
      console.log("Received email param:", email); // Debugging
  
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }
  
      const userTours = await Tour.find({ email }).select('name date album description').sort({ createdAt: -1 });
      console.log("Tours found:", userTours); // Debugging
  
      if (!userTours.length) {
        return res.status(200).json({
          success: true,
          message: 'No tours found for this user',
          data: []
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'User tours retrieved successfully',
        data: userTours
      });
    } catch (error) {
      console.error('Error fetching user tours:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving user tours',
        error: error.message
      });
    }
  };
  


module.exports = { 
    getAllTours, 
    getTourById, 
    getLatestTourByEmail,  // Add this to exports,
    getUserTours
};
