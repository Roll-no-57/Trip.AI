const { Pinecone } = require("@pinecone-database/pinecone");
const { JinaEmbeddingFunction } = require('chromadb');
const dotenv = require('dotenv');
const fs = require('fs/promises');


// Load environment variables
dotenv.config();

// Initialize Pinecone
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// Initialize Jina embeddings
const embedder = new JinaEmbeddingFunction({
    jinaai_api_key: process.env.JINA_API_KEY,
    model_name: 'jina-embeddings-v2-base-en',
});

// Function to load and parse the data file
async function loadImageData(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        // Assuming each line is in format: image_url,description
        const lines = fileContent.trim().split('\n');
        const data = lines.map(line => {
            const [imageUrl, description] = line.split(',');
            return {
                imageUrl: imageUrl.trim(),
                description: description.trim()
            };
        });
        console.log(`Loaded ${data.length} image-description pairs`);
        return data;
    } catch (error) {
        console.error("Error loading image data:", error);
        throw error;
    }
}

// Function to generate embeddings for descriptions
async function generateEmbeddings(descriptions) {
    try {
        console.log("Generating embeddings for descriptions...");
        console.log(descriptions);
        const embeddings = await embedder.generate(descriptions);
        console.log("Embeddings generated for descriptions");
        console.log(embeddings);
        return embeddings;
    } catch (error) {
        console.error("Error generating embeddings:", error);
        throw error;
    }
}

// Function to store data in Pinecone
async function storeInPinecone(imageData, embeddings) {
    try {
        const indexName = "imag";
        const index = pinecone.Index(indexName);

        // Prepare vectors for upsert
        const vectors = embeddings.map((embedding, idx) => ({
            id: `img_${idx}`,
            values: embedding,
            metadata: {
                imageUrl: imageData[idx].imageUrl,
                description: imageData[idx].description
            }
        }));

        // Upsert vectors in batches
        const batchSize = 100;
        for (let i = 0; i < vectors.length; i += batchSize) {
            const batch = vectors.slice(i, i + batchSize);
            await index.upsert(batch);
        }

        console.log("Data successfully stored in Pinecone");
        return index;
    } catch (error) {
        console.error("Error storing in Pinecone:", error);
        throw error;
    }
}

// Function to search images based on query
async function searchImages(query) {
    try {
        const index = pinecone.Index("imag");

        // Generate embedding for the query
        const queryEmbedding = await embedder.generate([query]);

        // Query Pinecone
        const queryResponse = await index.query({
            vector: queryEmbedding[0],
            topK: 5,  // Return top 5 matches
            includeMetadata: true
        });

        // Format results
        const results = queryResponse.matches.map(match => ({
            imageUrl: match.metadata.imageUrl,
            description: match.metadata.description,
            score: match.score
        }));
        results.sort((a, b) => b.score - a.score);
        return results;
    } catch (error) {
        console.error("Error searching images:", error);
        throw error;
    }
}

// Main execution function
async function main(UserSearchQuery) {
    try {
        // Load image data from file
        // const imageData = await loadImageData('../controllers/imageDescription.txt');
        const imageDataPath = 'C:/Users/DELL/Desktop/BCF2024Hackathon/AI-Trip-Planner/controllers/imageDescription.txt';
        const imageData = await loadImageData(imageDataPath);


        // Generate embeddings for descriptions
        const descriptions = imageData.map(item => item.description);
        const embeddings = await generateEmbeddings(descriptions);
        console.log("Embeddings generated for descriptions");
        console.log(embeddings);

        // Store in Pinecone
        await storeInPinecone(imageData, embeddings);

        // Example search
        const query = UserSearchQuery;
        const searchResults = await searchImages(query);

        console.log("Search Results:", searchResults);
        return searchResults;
    } catch (error) {
        console.error("Error in main execution:", error);
    }
}

// Run the application
module.exports = { main };