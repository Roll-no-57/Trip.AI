# AI-Trip-Planner

The respective API endpoints are as follows:    

# Chat

## a. Get Travel plan 
Endpoint URL: `GET /api/v1/chat`  
Request Body:   
```json
{
    "prompt":"I am planning to trip from dhaka to sreemangal .now tell me how can I go to trip . suggest me transportation,meals,accomodations there and total cost"
}
```
Example Response:  
```json
{
    "success": true,
    "response": {
        "transportationOptions": {
            "Going": {
                "start": "Dhaka",
                "end": "Sreemangal",
                "goBY": {
                    "type": "AC Bus (S. Alam, Shyamoli, etc.)",
                    "price": "500-700 BDT",
                    "duration": "4-5 hours"
                }
            },
            "Returning": {
                "start": "Sreemangal",
                "end": "Dhaka",
                "goBY": {
                    "type": "AC Bus (S. Alam, Shyamoli, etc.)",
                    "price": "500-700 BDT",
                    "duration": "4-5 hours"
                }
            }
        },
        "accommodationOptions": {
            "budget": [
                {
                    "name": "Hotel Green View",
                    "priceRange": "under 1500 BDT/night"
                },
                {
                    "name": "Hotel Hilltop",
                    "priceRange": "under 2000 BDT/night"
                }
            ],
            "midRange": [
                {
                    "name": "Hotel Tea Resort",
                    "priceRange": "3000-5000 BDT/night"
                },
                {
                    "name": "Hotel Rajbari",
                    "priceRange": "4000-6000 BDT/night"
                }
            ],
            "luxury": [
                {
                    "name": "The Leela Palace",
                    "priceRange": "7000+ BDT/night"
                },
                {
                    "name": "The Westin Dhaka",
                    "priceRange": "10000+ BDT/night"
                }
            ]
        },
        "dailyItinerary": {
            "day1": {
                "activities": [
                    {
                        "activity": "Visit the Lawachara National Park",
                        "time": "9:00 AM",
                        "duration": "3-4 hours"
                    },
                    {
                        "activity": "Explore the tea gardens",
                        "time": "1:00 PM",
                        "duration": "2-3 hours"
                    },
                    {
                        "activity": "Visit the Sreemangal Tea Museum",
                        "time": "4:00 PM",
                        "duration": "1-2 hours"
                    }
                ],
                "bestSpots": "Lawachara National Park, Tea Gardens, Sreemangal Tea Museum",
                "restaurants": "Hotel Green View Restaurant, Hotel Hilltop Restaurant"
            },
            "day2": {
                "activities": [
                    {
                        "activity": "Visit the Madhabpur Lake",
                        "time": "9:00 AM",
                        "duration": "2-3 hours"
                    },
                    {
                        "activity": "Explore the local market",
                        "time": "12:00 PM",
                        "duration": "1-2 hours"
                    },
                    {
                        "activity": "Enjoy a boat ride on the Baikka Beel",
                        "time": "3:00 PM",
                        "duration": "1-2 hours"
                    }
                ],
                "bestSpots": "Madhabpur Lake, Local Market, Baikka Beel",
                "restaurants": "Hotel Tea Resort Restaurant, Hotel Rajbari Restaurant"
            },
            "day3": {
                "activities": [
                    {
                        "activity": "Visit the Bisnakandi Waterfall",
                        "time": "9:00 AM",
                        "duration": "3-4 hours"
                    },
                    {
                        "activity": "Relax at a tea garden cafe",
                        "time": "1:00 PM",
                        "duration": "2-3 hours"
                    },
                    {
                        "activity": "Enjoy a scenic drive back to Dhaka",
                        "time": "5:00 PM",
                        "duration": "4-5 hours"
                    }
                ],
                "bestSpots": "Bisnakandi Waterfall, Tea Garden Cafes",
                "restaurants": "Local restaurants near the waterfall"
            }
        },
        "mealPlan": {
            "breakfast": [
                {
                    "option": "Paratha with egg and tea",
                    "price": "100-150 BDT"
                },
                {
                    "option": "Luchi with alur dom and tea",
                    "price": "150-200 BDT"
                }
            ],
            "lunch": [
                {
                    "option": "Biryani",
                    "price": "200-300 BDT"
                },
                {
                    "option": "Fish curry with rice",
                    "price": "150-250 BDT"
                }
            ],
            "dinner": [
                {
                    "option": "Chicken curry with rice",
                    "price": "250-350 BDT"
                },
                {
                    "option": "Vegetable curry with rice",
                    "price": "150-250 BDT"
                }
            ],
            "localSpecialties": "Tea, Tea-based snacks, Fish curry, Chicken curry, Biryani"
        },
        "costBreakdown": {
            "transportationTotal": "1000-1400 BDT",
            "accommodation": {
                "budget": "1500-2000 BDT",
                "midRange": "3000-6000 BDT",
                "luxury": "7000+ BDT"
            },
            "foodExpenses": "1500-2000 BDT",
            "activityCosts": "500-1000 BDT",
            "emergencyFunds": "500-1000 BDT",
            "totalBudgetPerPerson": "4500-7000 BDT"
        },
        "essentialTips": {
            "bestTimeToVisit": "October to March (winter season)",
            "weatherConsiderations": "Expect pleasant weather with occasional rain during winter",
            "localCustoms": "Respect local customs and traditions, dress modestly",
            "safetyPrecautions": "Be aware of your surroundings, avoid walking alone at night",
            "whatToPack": "Comfortable clothes, walking shoes, raincoat, sunscreen, insect repellent",
            "contactNumbers": "Emergency numbers: 999, 100"
        }
    }
}
```
# Weather

## a. Get weather info by location
Endpoint URL: `GET /api/v1/weather/:location`  
Request Body:   
```json
```
Example Response:
```json
{
    "location": "Dhaka, Dhaka District, Bangladesh",
    "latitude": 23.7644025,
    "longitude": 90.389015,
    "weather": {
        "latitude": 23.75,
        "longitude": 90.375,
        "generationtime_ms": 0.0629425048828125,
        "utc_offset_seconds": 21600,
        "timezone": "Asia/Dhaka",
        "timezone_abbreviation": "+06",
        "elevation": 9,
        "daily_units": {
            "time": "iso8601",
            "temperature_2m_max": "°C",
            "temperature_2m_min": "°C",
            "precipitation_sum": "mm",
            "precipitation_probability_max": "%",
            "windgusts_10m_max": "km/h",
            "sunrise": "iso8601",
            "sunset": "iso8601"
        },
        "daily": {
            "time": [
                "2024-10-24",
                "2024-10-25",
                "2024-10-26",
                "2024-10-27",
                "2024-10-28",
                "2024-10-29",
                "2024-10-30"
            ],
            "temperature_2m_max": [
                29.2,
                29.9,
                31.8,
                32.9,
                32.6,
                32.1,
                31.3
            ],
            "temperature_2m_min": [
                24.7,
                24.2,
                24.9,
                25.4,
                25.2,
                25,
                25.1
            ],
            "precipitation_sum": [
                5,
                6.3,
                0,
                0,
                0.6,
                0.3,
                0.3
            ],
            "precipitation_probability_max": [
                48,
                68,
                13,
                13,
                0,
                5,
                18
            ],
            "windgusts_10m_max": [
                28.8,
                33.1,
                15.5,
                11.9,
                12.6,
                16.2,
                11.5
            ],
            "sunrise": [
                "2024-10-24T06:00",
                "2024-10-25T06:00",
                "2024-10-26T06:01",
                "2024-10-27T06:01",
                "2024-10-28T06:02",
                "2024-10-29T06:02",
                "2024-10-30T06:03"
            ],
            "sunset": [
                "2024-10-24T17:25",
                "2024-10-25T17:24",
                "2024-10-26T17:23",
                "2024-10-27T17:22",
                "2024-10-28T17:22",
                "2024-10-29T17:21",
                "2024-10-30T17:20"
            ]
        }
    }
}
```








