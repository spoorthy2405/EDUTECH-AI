const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

router.get("/videos", async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  try {
    const { examName } = req.query; // Get exam name from request query
    if (!examName) {
      return res.status(400).json({ error: "Exam name is required" });
    }

    const response = await axios.get(BASE_URL, {
      params: {
        key: YOUTUBE_API_KEY,
        q: `${examName} study material`,
        part: "snippet",
        maxResults: 10,
        type: "video",
      },
    });

    res.json(response.data.items);
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});

module.exports = router;
