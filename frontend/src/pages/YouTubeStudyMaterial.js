import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./YouTubeStudyMaterial.css";

const YouTubeStudyMaterial = () => {
  const { examName } = useParams();
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(examName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = async (query) => {
    if (!query || query.trim() === '') {
      setVideos([]);
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/youtube/videos`, {
        params: {
          examName: query.trim()
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      if (response.data && Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setError("Received unexpected data format from server.");
        setVideos([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError(
        error.response?.data?.error || 
        error.message || 
        "Failed to fetch videos. Please try again later."
      );
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (examName) {
      setSearchTerm(examName);
      fetchVideos(examName);
    }
  }, [examName]);

  return (
    <div className="youtube-container">
      <h1 className="title">YouTube Study Material for {examName}</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for more study videos..."
        />
        <button 
          onClick={() => { if (searchTerm.trim() !== "") { fetchVideos(searchTerm); } }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {loading ? (
        <p className="loading">Loading videos...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : videos.length > 0 ? (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id.videoId} className="video-card">
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="video-thumbnail"
                />
              </a>
              <p className="video-title">{video.snippet.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-videos">No videos found.</p>
      )}
    </div>
  );
};

export default YouTubeStudyMaterial;
