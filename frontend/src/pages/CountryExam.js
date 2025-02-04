import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CountryExam = () => {
  const { countryId } = useParams();
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/quiz/exams/${countryId}`
        );
        setExams(result.data);
      } catch (err) {
        setError("Failed to load exams. Please try again later.");
        console.error("Error fetching exams", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [countryId]);

  const filteredExams = exams.filter((exam) =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Exams for Selected Country</h1>
        <p style={subtitleStyle}>Select an exam to explore further options.</p>
        <input
          type="text"
          placeholder="Search exams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </header>
      <main style={mainStyle}>
        {loading ? (
          <div style={spinnerContainer}>
            <div style={spinner}></div>
            <p style={loadingStyle}>Loading exams...</p>
          </div>
        ) : error ? (
          <p style={errorStyle}>{error}</p>
        ) : filteredExams.length > 0 ? (
          <div style={cardContainerStyle}>
            {filteredExams.map((exam) => (
              <div key={exam._id} style={cardStyle}>
                <h3 style={examTitleStyle}>{exam.name}</h3>
                <p style={examDetailStyle}>
                  Duration: {exam.duration} mins | Difficulty: {exam.difficulty}
                </p>
                <Link to={`/test-options/${exam._id}`} style={linkStyle}>
                  <button style={buttonStyle}>View Exam</button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={noDataStyle}>No exams available for this country.</p>
        )}
      </main>
      <footer style={footerStyle}>
        <Link to="/dashboard" style={backLinkStyle}>
          &larr; Back to Dashboard
        </Link>
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
  backgroundColor: "#f8f9fa",
  fontFamily: "'Roboto', sans-serif",
  color: "#333",
};

const headerStyle = {
  padding: "20px",
  backgroundColor: "#4CAF50",
  color: "white",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
};

const subtitleStyle = {
  fontSize: "1.2rem",
};

const searchInputStyle = {
  marginTop: "10px",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "80%",
  maxWidth: "400px",
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
};

const spinner = {
  border: "5px solid #f3f3f3",
  borderTop: "5px solid #4CAF50",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  animation: "spin 1s linear infinite",
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: "20px",
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  textAlign: "left",
};

const examTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#007BFF",
};

const examDetailStyle = {
  fontSize: "14px",
  color: "#666",
};

const buttonStyle = {
  marginTop: "10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 15px",
  fontSize: "14px",
  cursor: "pointer",
};

const linkStyle = {
  textDecoration: "none",
};

const noDataStyle = {
  fontSize: "18px",
  color: "#666",
};

const errorStyle = {
  fontSize: "18px",
  color: "red",
};

const footerStyle = {
  padding: "15px",
  backgroundColor: "#333",
  color: "white",
  textAlign: "center",
};

const backLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};

const loadingStyle = {
  fontSize: "16px",
  color: "#555",
  marginTop: "10px",
  textAlign: "center",
};





export default CountryExam;
