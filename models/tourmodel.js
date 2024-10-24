const mongoose = require('mongoose');

// Task schema for daily activities
const taskSchema = new mongoose.Schema({
    activity: { type: String, required: true },
    estimated_time: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    place: { type: String, required: true },
    status: { type: String, default: 'pending' }
}, { _id: false });

// Modified daily itinerary schema
const dailyItinerarySchema = new mongoose.Schema({
    day: { type: String, required: true }, // Changed to String to accommodate format like "Day 1 (2024-10-26)"
    tasks: [taskSchema],
    // Keeping these optional for backward compatibility
    bestSpots: { type: String },
    restaurants: { type: String }
}, { _id: false });

// Hotel schema
const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
}, { _id: false });

// Budget estimation schema
const budgetEstimationSchema = new mongoose.Schema({
    accommodation: { type: String, required: true },
    food: { type: String, required: true },
    sightseeing: { type: String, required: true },
    transportation: { type: String, required: true }
}, { _id: false });

// User input schema
const userInputSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true }
}, { _id: false });

// Keeping all existing schemas for backward compatibility
const transportationSchema = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true }
}, { _id: false });

const accommodationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priceRange: { type: String, required: true }
}, { _id: false });

const mealPlanSchema = new mongoose.Schema({
    option: { type: String, required: true },
    price: { type: String, required: true }
}, { _id: false });

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
}, { _id: false });

// Updated main tour schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        default: function() {
            return `Tour-${Tour.countDocuments() + 1}`;
        }
    },
    email: { type: String, required: true },
    userInput: userInputSchema,
    hotel: hotelSchema,
    estimationBudget: budgetEstimationSchema,
    tourPlan: [dailyItinerarySchema],

    // Existing fields (all made optional to maintain backward compatibility)
    location: { type: String },
    transportation: transportationSchema,
    accommodation: accommodationSchema,
    mealPlan: mealPlanSchema,
    dailyItinerary: [dailyItinerarySchema], // Kept for backward compatibility
    costBreakdown: {
        transportationTotal: { type: String },
        accommodation: {
            budget: { type: String },
            midRange: { type: String },
            luxury: { type: String }
        },
        foodExpenses: { type: String },
        activityCosts: { type: String },
        emergencyFunds: { type: String },
        totalBudgetPerPerson: { type: String }
    },
    essentialTips: {
        bestTimeToVisit: { type: String },
        weatherConsiderations: { type: String },
        localCustoms: { type: String },
        safetyPrecautions: { type: String },
        whatToPack: { type: String },
        contactNumbers: { type: String }
    },
    album: [imageSchema],
    tourVideo: { type: String }
});

// Pre-save hook to set name dynamically
tourSchema.pre('save', async function(next) {
    if (!this.name) {
        const count = await Tour.countDocuments();
        this.name = `Tour-${count + 1}`;
    }
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;