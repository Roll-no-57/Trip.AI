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
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const [ setText] = useState('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleSend = () => {
    setText(transcript);
    // Send transcript to backend for processing, etc.
  };

  return (
    <div>
      <h2>Speech Recognition Demo</h2>
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{listening ? 'Listening...' : 'Click to start speaking'}</p>
      <p>Transcript: {transcript}</p>

      <button onClick={handleSend}>Send to LLM</button>
    </div>
  );
};

export default SpeechToText;

```








