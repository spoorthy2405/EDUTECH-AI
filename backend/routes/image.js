const express = require('express');
const upload = require('../middleware/upload');
const analyzeImage = require('../utils/vision');

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        const result = await analyzeImage(req.file.path);
        res.json({ text: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
