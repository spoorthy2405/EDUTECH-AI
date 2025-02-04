const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const analyzeImage = async (filePath) => {
    try {
        const [result] = await client.textDetection(filePath);
        const text = result.textAnnotations.length ? result.textAnnotations[0].description : "No text found";
        return text;
    } catch (error) {
        console.error('Error analyzing image:', error);
        throw new Error('Failed to analyze image');
    }
};

module.exports = analyzeImage;
