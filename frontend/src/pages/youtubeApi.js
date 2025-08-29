import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchYouTubeVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: API_KEY,
        part: "snippet",
        q: query,
        maxResults: 10,  // Number of videos to fetch
        type: "video"
      }
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};
