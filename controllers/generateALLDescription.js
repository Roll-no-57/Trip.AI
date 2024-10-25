const fs = require('fs');
const path = require('path');
const { getAllImagesFromTours } = require('./images');
const { describeImage } = require('../AI-models/generateDescription');

// Function to show all images and save URL + description in a text file
async function CreteImageDesc() {
  try {
    const images = await getAllImagesFromTours(); // Fetch the image URLs
    console.log(images);

    // Prepare an array to store the image descriptions
    let descriptions = [];

    for (const url of images) {
      try {
        const description = await describeImage(url); // Call function to describe the image
        // Save the URL and description as a string
        descriptions.push(`${url.url},${description}\n`);
      } catch (error) {
        console.error(`Error describing image at ${url}:`, error);
      }
    }

    // Write the descriptions to a file in the /controllers directory
    const filePath = path.join(__dirname, '../controllers/imageDescription.txt');
    fs.writeFileSync(filePath, descriptions.join(''), 'utf-8');
    console.log('Image descriptions saved successfully!');

  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Export the function
module.exports = { CreteImageDesc };
