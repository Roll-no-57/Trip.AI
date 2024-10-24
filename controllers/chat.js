const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Generation config
const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 8192,
};

// Function to handle chat requests
const handleChatRequest = async (req) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt. Please provide a non-empty string.');
  }

  // Define the expected response structure
  const expectedStructure = {
    "transportationOptions": {
      "fromDhakaToCoxBazar": {
        "options": [
          {
            "type": "bus",
            "price": "current price",
            "duration": "duration"
          },
          {
            "type": "train",
            "price": "current price",
            "duration": "duration"
          }
        ],
        "fromTeknafToSaintMartin": [
          {
            "mode": "ship",
            "timings": "current timings",
            "price": "current price"
          }
        ],
        "localTransportation": "local transport options on the island"
      }
    },
    "accommodationOptions": {
      "budget": [
        {
          "name": "Hotel Name",
          "priceRange": "under 3000 BDT/night"
        }
      ],
      "midRange": [
        {
          "name": "Hotel Name",
          "priceRange": "3000-7000 BDT/night"
        }
      ],
      "luxury": [
        {
          "name": "Hotel Name",
          "priceRange": "7000+ BDT/night"
        }
      ]
    },
    "dailyItinerary": {
      "day1": {
        "activities": [
          {
            "activity": "activity description",
            "time": "timing",
            "duration": "estimated time"
          }
        ],
        "bestSpots": "best spots to visit",
        "restaurants": "suggested food spots"
      },
      "day2": {
        "activities": [
          {
            "activity": "activity description",
            "time": "timing",
            "duration": "estimated time"
          }
        ],
        "bestSpots": "best spots to visit",
        "restaurants": "suggested food spots"
      },
      "day3": {
        "activities": [
          {
            "activity": "activity description",
            "time": "timing",
            "duration": "estimated time"
          }
        ],
        "bestSpots": "best spots to visit",
        "restaurants": "suggested food spots"
      }
    },
    "mealPlan": {
      "breakfast": [
        {
          "option": "breakfast option",
          "price": "price"
        }
      ],
      "lunch": [
        {
          "option": "lunch recommendation",
          "price": "price"
        }
      ],
      "dinner": [
        {
          "option": "dinner suggestion",
          "price": "price"
        }
      ],
      "localSpecialties": "must-try local seafood and specialties"
    },
    "costBreakdown": {
      "transportationTotal": "total cost",
      "accommodation": {
        "budget": "cost",
        "midRange": "cost",
        "luxury": "cost"
      },
      "foodExpenses": "estimated food cost",
      "activityCosts": "total activity costs",
      "emergencyFunds": "recommended emergency funds",
      "totalBudgetPerPerson": "total budget per person"
    },
    "essentialTips": {
      "bestTimeToVisit": "best time",
      "weatherConsiderations": "weather info",
      "localCustoms": "customs and etiquette",
      "safetyPrecautions": "safety tips",
      "whatToPack": "packing list",
      "contactNumbers": "important contact numbers"
    }
  };

  // Add specific instructions for JSON response
  const enhancedPrompt = `${prompt}

You are a travel planning expert for Bangladesh. Please provide a detailed travel itinerary following exactly this JSON structure, with no additional text or formatting:

${JSON.stringify(expectedStructure, null, 2)}

Important requirements:
1. Response must be valid JSON that can be parsed by JSON.parse()
2. Use double quotes for all strings
3. Don't include any explanatory text outside the JSON
4. Don't use comments or markdown
5. Include realistic, current prices and timings for Bangladesh
6. Focus on providing detailed, practical information for university students
7. Maintain the exact structure shown above
8. Fill in all fields with actual values, don't leave placeholder text`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: enhancedPrompt }]}],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();
    
    // Try to parse the response as JSON
    try {
      // Remove any potential markdown code block markers
      const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
      const jsonResponse = JSON.parse(cleanJson);
      
      // Validate that the response matches the expected structure
      const validateStructure = (expected, actual, path = '') => {
        if (typeof expected !== typeof actual) {
          throw new Error(`Invalid type at ${path}. Expected ${typeof expected}, got ${typeof actual}`);
        }
        if (Array.isArray(expected)) {
          if (!Array.isArray(actual)) {
            throw new Error(`Expected array at ${path}`);
          }
          return;
        }
        if (typeof expected === 'object' && expected !== null) {
          for (const key of Object.keys(expected)) {
            if (!(key in actual)) {
              throw new Error(`Missing key "${key}" at ${path}`);
            }
            validateStructure(expected[key], actual[key], `${path}.${key}`);
          }
        }
      };

      validateStructure(expectedStructure, jsonResponse);
      return jsonResponse;
    } catch (parseError) {
      throw new Error(`Failed to parse or validate Gemini response as JSON: ${parseError.message}\nResponse was: ${text}`);
    }
  } catch (error) {
    throw new Error(`Error generating response: ${error.message}`);
  }
};

// Example usage with error handling
const handleJsonResponse = async (req, res) => {
  try {
    const result = await handleChatRequest(req);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 'error'
    });
  }
};

module.exports = {
  handleChatRequest,
  handleJsonResponse
};