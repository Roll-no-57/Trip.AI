// Importing required modules
const express = require('express');
const { handleWeatherRequest } = require('../controllers/weather');
const router = express.Router();

// Define the route to fetch weather data based on location input
router.get('/weather/:location', handleWeatherRequest);

module.exports = router;
