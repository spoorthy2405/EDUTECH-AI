import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", { username, password });
      if (response.data.success) {
        alert("Signup successful! You can now log in.");
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSignup} style={formStyle}>
        <h2 style={titleStyle}>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Signup
        </button>
      </form>
    </div>
  );
};

// Inline styles for simplicity
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f9f9f9",
};

const formStyle = {
  backgroundColor: "white",
  padding: "30px 40px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  width: "300px",
};

const titleStyle = {
  marginBottom: "20px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  width: "100%",
  marginTop: "10px",
  transition: "background-color 0.3s ease",
};

export default Signup;
