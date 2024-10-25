# AI-Trip-Planner

The respective API endpoints are as follows:    

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

# Tour

## a. Get all images from a user tour
Endpoint URL: `GET /api/v1/images`  
Request Body:   
```json

```
Example Response:
```json
{
    "success": true,
    "message": "Images retrieved successfully",
    "data": [
        {
            "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792279/tour-album/qwz8gedq1hyohou7cesg.jpg"
        },
        {
            "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792289/tour-album/zqzceniffdxo2p8c5n3z.jpg"
        },
        {
            "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792305/tour-album/qhutirsrlvb1gp7ntts4.jpg"
        }
    ]
}
```

# Tour

## a. Get all images from a user with tour id
Endpoint URL: `GET /api/v1/images/:id`  
Request Body:   
```json

```
Example Response:
```json
{
    "success": true,
    "message": "Images retrieved successfully",
    "data": [
        {
            "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792279/tour-album/qwz8gedq1hyohou7cesg.jpg"
        },
        {
            "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792289/tour-album/zqzceniffdxo2p8c5n3z.jpg"
        },
        {
            "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792305/tour-album/qhutirsrlvb1gp7ntts4.jpg"
        }
    ]
}
```

# Tour

## a. Get videos from a user tour id 
Endpoint URL: `GET /api/v1/videos/:id`  
Request Body:   
```json

```
Example Response:
```json
{
    "success": true,
    "message": "Video retrieved successfully",
    "data":             
    "https://res.cloudinary.com/dg1sx19ve/video/upload/v1729792994/dhv0qwf1quvdhk4j9ecl.mp4"
}
```

# Tour

## a. Post all info from a  tour
Endpoint URL: `POST /api/v1/tour`  
Request Body:   
```json
{
    "email": "example@example.com",
    "userInput": {
        "from": "New York",
        "to": "Paris",
        "startDate": "2024-11-01",
        "endDate": "2024-11-10"
    },
    "hotel": {
        "name": "Hotel de Paris",
        "latitude": "48.8566",
        "longitude": "2.3522"
    },
    "estimationBudget": {
        "accommodation": "1000",
        "food": "500",
        "sightseeing": "300",
        "transportation": "700"
    },
    "tourPlan": [
        {
            "day": "Day 1 (2024-11-01)",
            "tasks": [
                {
                    "activity": "Visit Eiffel Tower",
                    "estimated_time": "2 hours",
                    "latitude": "48.8584",
                    "longitude": "2.2945",
                    "place": "Paris",
                    "status": "pending"
                },
                {
                    "activity": "Lunch at a cafe",
                    "estimated_time": "1 hour",
                    "latitude": "48.8590",
                    "longitude": "2.2975",
                    "place": "Paris",
                    "status": "pending"
                }
            ]
        }
    ],
    "location": "Paris",
    "transportation": {
        "start": "New York",
        "end": "Paris",
        "type": "Flight",
        "price": "500",
        "duration": "8 hours"
    },
    "accommodation": {
        "name": "Hotel de Paris",
        "priceRange": "Luxury"
    },
    "mealPlan": {
        "option": "Full Board",
        "price": "200"
    },
    "costBreakdown": {
        "transportationTotal": "500",
        "accommodation": {
            "budget": "400",
            "midRange": "700",
            "luxury": "1000"
        },
        "foodExpenses": "200",
        "activityCosts": "100",
        "emergencyFunds": "150",
        "totalBudgetPerPerson": "1950"
    },
    "essentialTips": {
        "bestTimeToVisit": "Spring",
        "weatherConsiderations": "Mild weather",
        "localCustoms": "Be polite and learn basic French",
        "safetyPrecautions": "Watch for pickpockets",
        "whatToPack": "Comfortable shoes, light jacket",
        "contactNumbers": "112 for emergencies"
    }
}
```
Example Response:
```json
{
    "success": true,
    "message": "Tour created successfully",
    "data": {
        "name": "Tour-2",
        "email": "example@example.com",
        "userInput": {
            "from": "New York",
            "to": "Paris",
            "startDate": "2024-11-01",
            "endDate": "2024-11-10"
        },
        "hotel": {
            "name": "Hotel de Paris",
            "latitude": "48.8566",
            "longitude": "2.3522"
        },
        "estimationBudget": {
            "accommodation": "1000",
            "food": "500",
            "sightseeing": "300",
            "transportation": "700"
        },
        "tourPlan": [
            {
                "day": "Day 1 (2024-11-01)",
                "tasks": [
                    {
                        "activity": "Visit Eiffel Tower",
                        "estimated_time": "2 hours",
                        "latitude": "48.8584",
                        "longitude": "2.2945",
                        "place": "Paris",
                        "status": "pending"
                    },
                    {
                        "activity": "Lunch at a cafe",
                        "estimated_time": "1 hour",
                        "latitude": "48.8590",
                        "longitude": "2.2975",
                        "place": "Paris",
                        "status": "pending"
                    }
                ]
            }
        ],
        "album": [],
        "tourVideo": "",
        "_id": "671a9a482788617795e9d9f8",
        "dailyItinerary": [],
        "__v": 0
    }
}
```

# Tour

## a. Get all tour info of a user
Endpoint URL: `GET /api/v1/tour`  
Request Body:   
```json

```
Example Response:
```json
{
    "success": true,
    "data": [
        {
            "_id": "671a87cdf4456a1546dffe5f",
            "name": "Tour-1",
            "email": "example@example.com",
            "userInput": {
                "from": "New York",
                "to": "Los Angeles",
                "startDate": "2024-10-26",
                "endDate": "2024-11-02"
            },
            "hotel": {
                "name": "Grand Hotel",
                "latitude": "34.0522",
                "longitude": "-118.2437"
            },
            "estimationBudget": {
                "accommodation": "2000",
                "food": "700",
                "sightseeing": "300",
                "transportation": "400"
            },
            "tourPlan": [
                {
                    "day": "Day 1 (2024-10-26)",
                    "tasks": [
                        {
                            "activity": "Visit Central Park",
                            "estimated_time": "3 hours",
                            "latitude": "40.7851",
                            "longitude": "-73.9683",
                            "place": "Central Park",
                            "status": "pending"
                        },
                        {
                            "activity": "Lunch at a local restaurant",
                            "estimated_time": "2 hours",
                            "latitude": "40.7831",
                            "longitude": "-73.9712",
                            "place": "Restaurant Name",
                            "status": "pending"
                        }
                    ]
                },
                {
                    "day": "Day 2 (2024-10-27)",
                    "tasks": [
                        {
                            "activity": "Explore Hollywood",
                            "estimated_time": "4 hours",
                            "latitude": "34.0928",
                            "longitude": "-118.3287",
                            "place": "Hollywood Sign",
                            "status": "pending"
                        }
                    ]
                }
            ],
            "album": [
                {
                    "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792279/tour-album/qwz8gedq1hyohou7cesg.jpg"
                },
                {
                    "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792289/tour-album/zqzceniffdxo2p8c5n3z.jpg"
                },
                {
                    "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729792305/tour-album/qhutirsrlvb1gp7ntts4.jpg"
                }
            ],
            "tourVideo": "https://res.cloudinary.com/dg1sx19ve/video/upload/v1729792994/dhv0qwf1quvdhk4j9ecl.mp4",
            "dailyItinerary": [],
            "__v": 0
        },
        {
            "_id": "671a9a482788617795e9d9f8",
            "name": "Tour-2",
            "email": "example@example.com",
            "userInput": {
                "from": "New York",
                "to": "Paris",
                "startDate": "2024-11-01",
                "endDate": "2024-11-10"
            },
            "hotel": {
                "name": "Hotel de Paris",
                "latitude": "48.8566",
                "longitude": "2.3522"
            },
            "estimationBudget": {
                "accommodation": "1000",
                "food": "500",
                "sightseeing": "300",
                "transportation": "700"
            },
            "tourPlan": [
                {
                    "day": "Day 1 (2024-11-01)",
                    "tasks": [
                        {
                            "activity": "Visit Eiffel Tower",
                            "estimated_time": "2 hours",
                            "latitude": "48.8584",
                            "longitude": "2.2945",
                            "place": "Paris",
                            "status": "pending"
                        },
                        {
                            "activity": "Lunch at a cafe",
                            "estimated_time": "1 hour",
                            "latitude": "48.8590",
                            "longitude": "2.2975",
                            "place": "Paris",
                            "status": "pending"
                        }
                    ]
                }
            ],
            "album": [],
            "tourVideo": "",
            "dailyItinerary": [],
            "__v": 0
        }
    ]
}
```

# Tour

## a. Get user tour id
Endpoint URL: `GET /api/v1/tour/:id`  
Request Body:   
```json

```
Example Response:
```json
{
    "success": true,
    "data": {
        "_id": "671a9a482788617795e9d9f8",
        "name": "Tour-2",
        "email": "example@example.com",
        "userInput": {
            "from": "New York",
            "to": "Paris",
            "startDate": "2024-11-01",
            "endDate": "2024-11-10"
        },
        "hotel": {
            "name": "Hotel de Paris",
            "latitude": "48.8566",
            "longitude": "2.3522"
        },
        "estimationBudget": {
            "accommodation": "1000",
            "food": "500",
            "sightseeing": "300",
            "transportation": "700"
        },
        "tourPlan": [
            {
                "day": "Day 1 (2024-11-01)",
                "tasks": [
                    {
                        "activity": "Visit Eiffel Tower",
                        "estimated_time": "2 hours",
                        "latitude": "48.8584",
                        "longitude": "2.2945",
                        "place": "Paris",
                        "status": "pending"
                    },
                    {
                        "activity": "Lunch at a cafe",
                        "estimated_time": "1 hour",
                        "latitude": "48.8590",
                        "longitude": "2.2975",
                        "place": "Paris",
                        "status": "pending"
                    }
                ]
            }
        ],
        "album": [],
        "tourVideo": "",
        "dailyItinerary": [],
        "__v": 0
    }
}
```

# upload images

## a. POST images
Endpoint URL: `POST /api/v1/tour/uploadimage/:tourId`  
Request Body:   
```json
{
    upload image (key value pair)
}
```
Example Response:
```json
{
    "message": "Image added to album",
    "data": {
        "_id": "671a9a482788617795e9d9f8",
        "name": "Tour-2",
        "email": "example@example.com",
        "userInput": {
            "from": "New York",
            "to": "Paris",
            "startDate": "2024-11-01",
            "endDate": "2024-11-10"
        },
        "hotel": {
            "name": "Hotel de Paris",
            "latitude": "48.8566",
            "longitude": "2.3522"
        },
        "estimationBudget": {
            "accommodation": "1000",
            "food": "500",
            "sightseeing": "300",
            "transportation": "700"
        },
        "tourPlan": [
            {
                "day": "Day 1 (2024-11-01)",
                "tasks": [
                    {
                        "activity": "Visit Eiffel Tower",
                        "estimated_time": "2 hours",
                        "latitude": "48.8584",
                        "longitude": "2.2945",
                        "place": "Paris",
                        "status": "pending"
                    },
                    {
                        "activity": "Lunch at a cafe",
                        "estimated_time": "1 hour",
                        "latitude": "48.8590",
                        "longitude": "2.2975",
                        "place": "Paris",
                        "status": "pending"
                    }
                ]
            }
        ],
        "album": [
            {
                "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729797263/tour-album/upze4frcggvergxx7ric.jpg"
            },
            {
                "url": "https://res.cloudinary.com/dg1sx19ve/image/upload/v1729797312/tour-album/ibkf3ifdht3mh56m2xtp.jpg"
            }
        ],
        "tourVideo": "",
        "dailyItinerary": [],
        "__v": 0
    }
}
```
# create video

## a. POST images
Endpoint URL: `POST /api/v1/tour/video/:tourId`  
Request Body:   
```json

```
Example Response:
```json
{
    "message": "Video created and uploaded successfully",
    "videoUrl": 
    "https://res.cloudinary.com/dg1sx19ve/video/upload/v1729797424/i123k9wsdattypkhry1a.mp4"
}
```





