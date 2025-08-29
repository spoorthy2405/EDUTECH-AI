import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PreviousPapersPage = () => {
  const { examId } = useParams();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousPapers = async () => {
      try {
        console.log(`📡 Fetching papers for: ${examId}`);
        const response = await axios.get(`http://localhost:5000/api/previous-papers/${encodeURIComponent(examId)}`);
        setPapers(response.data.map(paper => ({ ...paper, hover: false }))); // Ensure hover state is added
      } catch (err) {
        console.error("❌ Error fetching papers:", err);
        setError('Failed to fetch previous question papers.');
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousPapers();
  }, [examId]);

  const handleDownload = (url) => {
    if (!url) {
      console.error("❌ Download URL is null.");
      alert("Error generating download link. Please try again later.");
      return;
    }
    window.open(url, '_blank');
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>Previous Question Papers</h1>
      </header>

      <main style={mainStyle}>
        {loading ? (
          <div style={spinnerContainer}>
            <div className="spinner"></div>
            <p style={loadingStyle}>Loading previous question papers...</p>
          </div>
        ) : error ? (
          <div style={errorContainerStyle}>
            <p style={errorMessageStyle}>{error}</p>
            <button style={retryButtonStyle} onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          <div style={cardContainerStyle}>
            {papers.length > 0 ? (
              papers.map((paper) => (
                <div
                  key={paper.year}
                  style={{ ...cardStyle, ...(paper.hover ? cardHoverStyle : {}) }}
                  onClick={() => handleDownload(paper.url)}
                  onMouseEnter={() =>
                    setPapers((prev) => prev.map((p) => (p.year === paper.year ? { ...p, hover: true } : p)))
                  }
                  onMouseLeave={() =>
                    setPapers((prev) => prev.map((p) => (p.year === paper.year ? { ...p, hover: false } : p)))
                  }
                >
                  <h3 style={cardTitleStyle}>{paper.year}</h3>
                  <p style={cardDetailStyle}>Click to download</p>
                </div>
              ))
            ) : (
              <p style={noPapersStyle}>No previous question papers found.</p>
            )}
          </div>
        )}
      </main>

      <footer style={footerStyle}>
        <button style={backButtonStyle} onClick={() => navigate(-1)}>&larr; Back</button>
      </footer>
    </div>
  );
};

// 🔹 Styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#f0f2f5',
  color: '#333',
  fontFamily: "'Roboto', sans-serif",
};

const headerStyle = {
  padding: '20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headerTitleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
};

const mainStyle = {
  flexGrow: 1,
  padding: '20px',
  textAlign: 'center',
};

const spinnerContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
};

const loadingStyle = {
  fontSize: '16px',
  color: '#555',
  marginTop: '10px',
};

const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  padding: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  width: '200px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const cardHoverStyle = {
  transform: 'scale(1.05)',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
};

const cardTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const cardDetailStyle = {
  fontSize: '14px',
  color: '#555',
};

const errorContainerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const errorMessageStyle = {
  fontSize: '18px',
  color: '#d9534f',
  marginBottom: '10px',
};

const retryButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const noPapersStyle = {
  fontSize: '16px',
  color: '#777',
};

const footerStyle = {
  padding: '10px',
  backgroundColor: '#343a40',
  color: 'white',
  textAlign: 'center',
};

const backButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
};

// 🔹 Inject Global Spinner Animation
const styles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4CAF50;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PreviousPapersPage;
