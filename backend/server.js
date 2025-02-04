const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const upload = require("./middleware/upload");
const mongoose = require("mongoose");

dotenv.config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verify MongoDB connection
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/quiz", quizRoutes); // Quiz-related routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});