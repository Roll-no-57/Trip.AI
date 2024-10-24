const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'tour-album', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed image formats
    },
});

// Function to upload images and create a video
async function uploadImagesAndCreateVideo(imageUrls) {
    try {
        // Upload images
        const uploadPromises = imageUrls.map((url) => cloudinary.uploader.upload(url));
        const uploads = await Promise.all(uploadPromises);
        
        // Create a video from uploaded images
        const video = await cloudinary.uploader.upload_multi(uploads.map(img => img.secure_url), {
            resource_type: 'video', // Ensure you specify video resource
            type: 'upload',
            eager: [{ width: 500, height: 500, crop: 'fill' }], // Thumbnail settings for video
        });
  
        console.log('Video URL:', video.secure_url);
        return video.secure_url; // Return the video URL
    } catch (error) {
        console.error('Error creating video:', error);
        throw new Error('Error creating video');
    }
}

// Configure multer with the storage
const upload = multer({ storage });

// Export the upload middleware and the function
module.exports = { cloudinary, upload, uploadImagesAndCreateVideo };
