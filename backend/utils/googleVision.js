const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

async function processImageWithVision(imageUrl) {
  const [result] = await client.textDetection(imageUrl);
  const detections = result.textAnnotations;
  return detections[0]?.description.split("\n").map(answer => answer.trim()) || [];
}

module.exports = { processImageWithVision };
