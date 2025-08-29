import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const username = location.state?.username || "User";

  // Fetch country list from the backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/quiz/countries");
        
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };
    fetchCountries();
  }, []);

  // Filter countries based on search input
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logo}>EDUTEH-AI</div>
        <nav style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/features" style={styles.link}>Features</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/logout" style={styles.logoutButton}>Logout</Link>
        </nav>
      </header>

      {/* Welcome Section */}
      <section style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>Welcome, {username}!</h1>
        <p style={styles.welcomeMessage}>
          Explore countries and generate quiz questions tailored for your needs.
        </p>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statItem}>
          <h3>Total Countries</h3>
          <p>{40 || "Loading..."}</p>
        </div>
        <div style={styles.statItem}>
          <h3>Fun Fact</h3>
          <p>
            Did you know? The world's largest country by area is **Russia**!
          </p>
        </div>
        <div style={styles.statItem}>
          <h3>Your Progress</h3>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBar}></div>
          </div>
          <p>3 quizzes completed</p>
        </div>
      </section>

      {/* Country Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Country Selection Section */}
      <section style={styles.mainSection}>
        <h2 style={styles.sectionTitle}>Select a Country</h2>
        <div style={styles.countriesContainer}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div style={styles.countryCard} key={country._id}>
                {/* Placeholder flag */}
                <div style={styles.flagContainer}>
                  <img
                    src={`https://via.placeholder.com/150?text=${country.name}`}
                    alt={`${country.name} Flag`}
                    style={styles.flag}
                  />
                </div>
                <div style={styles.countryDetails}>
                  <h3 style={styles.countryName}>{country.name}</h3>
                  <p style={styles.countryDescription}>
                    Click to generate quizzes about {country.name}.
                  </p>
                  <Link to={`/country-exam/${country._id}`} style={styles.link}>
                    <button style={styles.countryButton}>Explore {country.name}</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.loadingMessage}>No countries found.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} QuizGen. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// Styles for the Dashboard component
const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
    backgroundColor: "#f1f8ff", // Soft blue background
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(to right, #4CAF50, #2E7D32)", // Green gradient
    color: "white",
    padding: "15px 20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.3s",
  },
  logoutButton: {
    color: "#4CAF50",
    backgroundColor: "white",
    padding: "7px 15px",
    borderRadius: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    border: "2px solid #4CAF50",
    transition: "all 0.3s",
  },
  welcomeSection: {
    textAlign: "center",
    padding: "40px 20px",
    background: "linear-gradient(to right, #e8f5e9, #c8e6c9)", // Light green gradient
    borderRadius: "10px",
    margin: "20px 10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  welcomeTitle: {
    fontSize: "2.2rem",
    margin: "0 0 10px",
    fontWeight: "600",
  },
  welcomeMessage: {
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "10px",
  },
  statsSection: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    margin: "20px 10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  statItem: {
    textAlign: "center",
    flex: 1,
  },
  progressBarContainer: {
    width: "120px",
    height: "12px",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    margin: "15px auto",
    position: "relative",
  },
  progressBar: {
    width: "60%", // Example progress value
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: "10px",
    transition: "width 0.4s ease",
  },
  searchContainer: {
    textAlign: "center",
    margin: "30px 0",
  },
  searchInput: {
    width: "350px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    outline: "none",
    transition: "all 0.3s ease",
  },
  searchInputFocus: {
    borderColor: "#4CAF50",
    boxShadow: "0 2px 8px rgba(76, 175, 80, 0.5)",
  },
  mainSection: {
    padding: "30px 20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    fontWeight: "600",
    color: "#2E7D32",
  },
  countriesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
  },
  countryCard: {
    width: "250px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
    textAlign: "center",
    cursor: "pointer",
  },
  countryCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  flagContainer: {
    width: "100%",
    height: "140px",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  flag: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  countryDetails: {
    padding: "15px",
  },
  countryName: {
    fontSize: "1.3rem",
    color: "#2E7D32",
    fontWeight: "bold",
    margin: "15px 0",
  },
  countryDescription: {
    fontSize: "0.95rem",
    color: "#666",
    marginBottom: "15px",
  },
  countryButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#333",
    color: "white",
    marginTop: "auto",
  },
};


export default Dashboard;
