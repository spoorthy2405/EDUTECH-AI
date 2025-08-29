const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const youtubeRoutes = require("./routes/youtube");

const upload = require("./middleware/upload");
const mongoose = require("mongoose");
const path = require('path');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Verify MongoDB connection
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

const app = express();
const PORT = process.env.PORT || 5001; // Default to 5001 if not specified

// Verify the port is available
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please check for other running instances.`);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/papers", express.static(path.join(__dirname, 'uploads/papers')));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/quiz", quizRoutes); // Quiz-related routes
app.use("/api/youtube", youtubeRoutes); // YouTube API routes
// Previous papers API routes

// Export the server for testing purposes
module.exports = server;