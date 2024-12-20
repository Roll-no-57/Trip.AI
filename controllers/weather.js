// Importing required modules
const axios = require('axios');
require('dotenv').config();  // Ensure you have your API keys in the .env file

const handleWeatherRequest = async (req, res) => {
    const location = req.params.location;
    const openCageApiKey = process.env.LONG_API_KEY;  // Ensure you are using the correct env key for OpenCage
    const openMeteoApiUrl = 'https://api.open-meteo.com/v1/forecast';

    try {
        // Step 1: Get latitude and longitude from OpenCage
        const openCageResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
                q: location,
                key: openCageApiKey
            }
        });

        const results = openCageResponse.data.results;

        // Check if any results were returned
        if (results.length === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const { lat, lng } = results[0].geometry;

        // Step 2: Use the latitude and longitude to get daily weather data from Open-Meteo
        const weatherResponse = await axios.get(openMeteoApiUrl, {
            params: {
                latitude: lat,
                longitude: lng,
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,windgusts_10m_max,sunrise,sunset',
                forecast_days: 7,  // You can adjust this to get more days if needed
                timezone: 'auto'   // Automatically adjust to the correct timezone
            }
        });

        // Send the weather data as the response
        return res.json({
            location: results[0].formatted,
            latitude: lat,
            longitude: lng,
            weather: weatherResponse.data
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving weather data' });
    }
};

module.exports = {
    handleWeatherRequest,
};
