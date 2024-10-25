const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: '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' }); // Replace with your actual API key

// Function that accepts an image URL and returns the description
async function describeImage(url) {
  try {
    console.log(url);
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "Describe the image at this URL in plain text, in one line without paragraphs or special characters, using 50-60 words"
            },
            {
              "type": "image_url",
              "image_url": {
                "url": url.url  // Use the passed URL
              }
            }
          ]
        },
        {
          "role": "assistant",
          "content": ""
        }
      ],
      "model": "llama-3.2-11b-vision-preview",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "stop": null
    });

    return chatCompletion.choices[0].message.content;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to generate image description.');
  }
}

// Export the function for external use
module.exports = { describeImage };
