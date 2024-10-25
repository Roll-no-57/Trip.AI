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
const handleChatRequest = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    const text = response.text();

    // Clean the response to remove special characters and formatting
    const cleanText = text.replace(/[^a-zA-Z0-9\s]/g, '').trim(); // Remove special characters

    return cleanText; // Return only plain text
  } catch (error) {
    throw new Error(`Error generating response: ${error.message}`);
  }
};

// Example usage with error handling
const handlePlainTextResponse = async (req, res) => {
  try {
    const result = await handleChatRequest(req.body.prompt); // Assuming prompt is passed in the request body
    res.send(result); // Send plain text response
  } catch (error) {
    res.status(500).send({
      error: error.message,
      status: 'error'
    });
  }
};

module.exports = {
  handleChatRequest,
  handlePlainTextResponse
};
