const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Path where papers are stored locally
const PAPERS_DIR = path.join(__dirname, '../uploads/papers');

// Ensure the papers directory exists
async function ensurePapersDir() {
    try {
        await fs.mkdir(PAPERS_DIR, { recursive: true });
    } catch (err) {
        console.error('Error creating papers directory:', err);
    }
}

// Initialize the directory
ensurePapersDir();

router.get('/:examId', async (req, res) => {
    const { examId } = req.params;
    const examDir = path.join(PAPERS_DIR, examId);

    try {
        // Check if exam directory exists
        try {
            await fs.access(examDir);
        } catch (err) {
            console.error(`❌ No files found for exam: ${examId}`);
            return res.status(404).json({ error: `No previous question papers found for ${examId}.` });
        }

        // Read all files in the exam directory
        const files = await fs.readdir(examDir);
        const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

        if (pdfFiles.length === 0) {
            console.error(`❌ No PDF files found in directory: ${examDir}`);
            return res.status(404).json({ error: `No PDF files found for ${examId}.` });
        }

        console.log(`✅ Found ${pdfFiles.length} PDF files for ${examId}`);

        const papers = pdfFiles.map(file => ({
            year: extractYearFromFilename(file),
            url: `/api/papers/${examId}/${file}`,
            filename: file
        }));

        res.json(papers);
    } catch (error) {
        console.error('❌ Server Error:', error);
        res.status(500).json({ error: 'Failed to fetch previous papers.', details: error.message });
    }
});

// Helper function to extract year from filename
function extractYearFromFilename(filename) {
    const match = filename.match(/(20\d{2})/);
    return match ? match[1] : 'Unknown';
}

// Route to serve the actual PDF files
router.get('/papers/:examId/:filename', (req, res) => {
    const { examId, filename } = req.params;
    const filePath = path.join(PAPERS_DIR, examId, filename);
    
    // Check if file exists and is a PDF
    if (!filename.toLowerCase().endsWith('.pdf')) {
        return res.status(400).json({ error: 'Invalid file type' });
    }

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error sending file: ${filePath}`, err);
            if (!res.headersSent) {
                res.status(404).json({ error: 'File not found' });
            }
        }
    });
});

module.exports = router;
