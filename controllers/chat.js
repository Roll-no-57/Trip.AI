// controllers/chat.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Function to clean text
const cleanText = (text) => {
  return text
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '')   // Remove italic markers
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\n+/g, ' ') // Replace multiple newlines with single space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();             // Remove leading/trailing whitespace
};

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

  // Add instruction for plain text to the prompt
  const enhancedPrompt = `${prompt}\n\nPlease provide your response in plain text format without any special characters, markdown formatting, or bullet points. Make it a simple, continuous paragraph of text.`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: enhancedPrompt }]}],
    generationConfig,
  });

  const response = await result.response;
  const cleanedText = cleanText(response.text());

  return cleanedText; // Return cleaned text directly
};

module.exports = {
  handleChatRequest,
};
