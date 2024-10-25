

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const PAGE_ID = '486589531195672'; // Replace with your Facebook page ID
const ACCESS_TOKEN = 'EAAHQa3LwClkBO2EpoSTtLR8n8Yi2nhL9ma46pVB8JipDcQrk65fjqcJXRg0D2hqFwROQOXGrayn1SiZC1yos5tiPrrz3zq8DFdW5zhFWlEOkGGQ90BhdZAPZBa3RwnZB6oW4jAMUZBzcmM6vhOqLK72vP4Sq1wWkFmjOGPolEiOlnZBJdIOw6dZBn93Qqs2ZBwjdaZAHoCL7vyQzZAxbnFFV67MDiN9wZDZD'; // Replace with your access token

async function fetchImageAndUpload(url,blog) {
    try {
        // Step 1: Fetch the AI-generated image
        const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');

        // Step 2: Create a FormData object for the Facebook upload
        const form = new FormData();
        // form.append('file', fs.createReadStream(IMAGE_PATH)); //to upload a local image
        form.append('file', imageBuffer, { filename: 'ai_image.png' }); // Adjust filename as needed
        form.append('access_token', ACCESS_TOKEN);
        form.append('message', blog ); // Optional message

        // Step 3: Upload the image to Facebook
        const uploadResponse = await axios.post(`https://graph.facebook.com/v12.0/${PAGE_ID}/photos`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        console.log('Image uploaded successfully:', uploadResponse.data);
    } catch (error) {
        console.error('Error fetching or uploading image:', error.response?.data || error.message);
    }
}

module.exports = {fetchImageAndUpload};


