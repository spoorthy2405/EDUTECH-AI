import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TestOptions = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamOptions = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/quiz/test-options/${examId}`);
        setExam(result.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching exam options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExamOptions();
  }, [examId]);

  const handleTestNavigation = (type) => {
    navigate(`/test/${examId}/${type}`);
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>Test Options</h1>
      </header>
      <main style={mainStyle}>
        {loading ? (
          <div style={spinnerContainer}>
            <div style={spinner}></div>
            <p style={loadingStyle}>Loading test options...</p>
          </div>
        ) : error ? (
          <div style={errorContainerStyle}>
            <p style={errorMessageStyle}>Failed to load test options. Please try again later.</p>
            <button style={retryButtonStyle} onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : exam ? (
          <>
            <h2 style={examTitleStyle}>{exam.name}</h2>
            {exam.description && <p style={examDescriptionStyle}>{exam.description}</p>}
            <div style={cardContainerStyle}>
              {/* Offline Test Card */}
              {exam.offline && (
                <div style={cardStyle}>
                  <h3 style={cardTitleStyle}>Offline Test</h3>
                  <p style={cardDetailStyle}>Duration: {exam.duration || 60} minutes</p>
                  <div style={progressBarContainer}>
                    <div style={{ ...progressBar, width: "70%" }}></div>
                  </div>
                  // Inside the offline card
                  <button
                    style={cardButtonStyle}
                    onClick={() => navigate(`/mcq/${examId}`)} // Navigate to MCQPage
                  >
                    Start Offline Test
                  </button>
                </div>
              )}

              {/* Online Test Card */}
              {exam.online && (
                <div style={cardStyle}>
                  <h3 style={cardTitleStyle}>Online Test</h3>
                  <p style={cardDetailStyle}>Duration: {exam.duration || 60} minutes</p>
                  <div style={progressBarContainer}>
                    <div style={{ ...progressBar, width: "50%" }}></div>
                  </div>
                  <button
                    style={cardButtonStyle}
                    onClick={() => handleTestNavigation("online")}
                  >
                    Start Online Test
                  </button>
                </div>
              )}
              
              {/* YouTube Study Material Card */}
<div style={{ ...cardStyle, backgroundColor: "#cce5ff", transform: "scale(1.05)" }}>
  <h3 style={cardTitleStyle}>YouTube Study Material</h3>
  <p style={cardDetailStyle}>Watch videos to enhance your learning.</p>
  <div style={progressBarContainer}>
    <div style={{ ...progressBar, width: "80%", backgroundColor: "#007BFF" }}></div>
  </div>
  <button style={cardButtonStyle} onClick={() => navigate(`/youtube-material/${encodeURIComponent(exam.name)}`)}>
  View Videos
</button>
</div>
            </div>
          </>
        ) : (
          <p style={errorMessageStyle}>Test options not available.</p>
        )}
      </main>
      <footer style={footerStyle}>
        <button style={backButtonStyle} onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </footer>
    </div>
  );
};

// Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "100vh",
  backgroundColor: "#f9f9f9",
  color: "#333",
  fontFamily: "'Roboto', sans-serif",
};

const headerStyle = {
  padding: "20px",
  backgroundColor: "#007BFF",
  color: "white",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const headerTitleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
};

const mainStyle = {
  flexGrow: 1,
  padding: "20px",
  textAlign: "center",
};

const spinnerContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
};

const spinner = {
  border: "5px solid #f3f3f3",
  borderTop: "5px solid #007BFF",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
};

const loadingStyle = {
  fontSize: "16px",
  color: "#555",
  marginTop: "10px",
};

const examTitleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "20px 0",
};

const examDescriptionStyle = {
  fontSize: "16px",
  color: "#555",
  marginBottom: "20px",
};

const cardContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  width: "250px",
  textAlign: "center",
};

const cardTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const cardDetailStyle = {
  fontSize: "14px",
  marginBottom: "10px",
  color: "#555",
};

const cardButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const progressBarContainer = {
  width: "100%",
  height: "8px",
  backgroundColor: "#e9ecef",
  borderRadius: "5px",
  margin: "10px 0",
  overflow: "hidden",
};

const progressBar = {
  height: "100%",
  backgroundColor: "#007BFF",
};

const errorContainerStyle = {
  textAlign: "center",
  marginTop: "20px",
};

const errorMessageStyle = {
  fontSize: "18px",
  color: "#d9534f",
  marginBottom: "10px",
};

const retryButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const footerStyle = {
  padding: "10px",
  backgroundColor: "#343a40",
  color: "white",
  textAlign: "center",
};

const backButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

export default TestOptions;
