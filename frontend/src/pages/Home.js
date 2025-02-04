import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div style={styles.container}>
    {/* Header */}
    <header style={styles.header}>
      <div style={styles.logo}>
        <h1 style={styles.logoText}>QuizGen</h1>
      </div>
      <nav style={styles.nav}>
        <Link to="/about" style={styles.navLink}>About</Link>
        <Link to="/features" style={styles.navLink}>Features</Link>
        <Link to="/contact" style={styles.navLink}>Contact</Link>
        <Link to="/login" style={{ ...styles.navLink, ...styles.navButton }}>Login</Link>
        <Link to="/signup" style={{ ...styles.navLink, ...styles.navButton }}>Signup</Link>
      </nav>
    </header>

    {/* Hero Section */}
    <section style={styles.hero}>
      <h2 style={styles.heroTitle}>Smarter Exam Preparation Starts Here</h2>
      <p style={styles.heroDescription}>
        Generate high-quality sample quiz papers tailored for competitive exams like UPSC and more, designed for aspirants worldwide.
      </p>
      <div>
        <Link to="/signup">
          <button style={styles.ctaButton}>Get Started</button>
        </Link>
        <Link to="/features">
          <button style={{ ...styles.ctaButton, ...styles.secondaryButton }}>Learn More</button>
        </Link>
      </div>
    </section>

    {/* Features Section */}
    <section style={styles.features}>
      <h3 style={styles.sectionTitle}>Why Choose QuizGen?</h3>
      <div style={styles.featureCards}>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Customizable Exams</h4>
          <p style={styles.cardDescription}>Easily create quizzes specific to different competitive exams around the globe.</p>
        </div>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>AI-Powered Recommendations</h4>
          <p style={styles.cardDescription}>Get smart recommendations based on your performance and focus areas.</p>
        </div>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Analytics Dashboard</h4>
          <p style={styles.cardDescription}>Track your progress with detailed analytics and personalized insights.</p>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section style={styles.testimonials}>
      <h3 style={styles.sectionTitle}>What Our Users Say</h3>
      <div style={styles.testimonialCards}>
        <div style={styles.card}>
          <p style={styles.testimonialText}>
            "QuizGen made my UPSC preparation so much easier. The analytics helped me focus on my weak areas. Highly recommend!"
          </p>
          <p style={styles.userName}>— Rohan, India</p>
        </div>
        <div style={styles.card}>
          <p style={styles.testimonialText}>
            "A game-changer for competitive exam aspirants! The quizzes are spot-on and very realistic."
          </p>
          <p style={styles.userName}>— Sarah, USA</p>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer style={styles.footer}>
      <div style={styles.footerLinks}>
        <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
        <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
      </div>
      <p>&copy; 2024 QuizGen. All Rights Reserved.</p>
      <p>Contact us: <a href="mailto:support@quizgen.com" style={styles.footerEmail}>support@quizgen.com</a></p>
    </footer>
  </div>
);

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logoText: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    margin: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
    fontSize: "1rem",
  },
  navButton: {
    backgroundColor: "white",
    color: "#4CAF50",
    padding: "5px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  hero: {
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#e8f5e9",
  },
  heroTitle: {
    fontSize: "2.5rem",
    color: "#2e7d32",
    margin: "0 0 20px",
  },
  heroDescription: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    margin: "0 auto 30px",
    color: "#555",
  },
  ctaButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#4CAF50",
    border: "1px solid #4CAF50",
  },
  features: {
    padding: "50px 20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  featureCards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    maxWidth: "300px",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: "1.2rem",
    color: "#2e7d32",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#555",
  },
  testimonials: {
    backgroundColor: "#f1f8e9",
    padding: "50px 20px",
    textAlign: "center",
  },
  testimonialText: {
    fontSize: "1rem",
    color: "#555",
    fontStyle: "italic",
  },
  userName: {
    fontSize: "1rem",
    marginTop: "10px",
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
  },
  footerLinks: {
    marginBottom: "10px",
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
  },
  footerEmail: {
    color: "white",
    textDecoration: "underline",
  },
};

export default Home;
