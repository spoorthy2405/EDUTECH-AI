const mongoose = require("mongoose");
const Country = require("./models/Country");
const Exam = require("./models/Exam");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/usersDB")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Sample country data
const countries = [
  { name: "India" },
  { name: "United States" },
  { name: "Australia" },
  { name: "Germany" },
  { name: "Canada" },
  { name: "United Kingdom" },
  { name: "France" },
  { name: "Japan" },
  { name: "South Korea" },
  { name: "Brazil" },
];

// Sample exams for each country
const examData = {
  India: ["JEE Main", "NEET", "UPSC", "CAT"],
  "United States": ["USMLE", "SAT", "GRE", "MCAT"],
  Australia: ["ATAR", "GAMSAT", "PTE Academic", "IELTS"],
  Germany: ["TestAS", "DSH", "Goethe-Zertifikat", "APS Exam"],
  Canada: ["CELPIP", "TOEFL", "LSAT", "MCAT"],
  "United Kingdom": ["UCAS", "GMAT", "IELTS", "LNAT"],
  France: ["DELF", "DALF", "Concours Exams", "BAC"],
  Japan: ["EJU", "JLPT", "TEAP", "JASSO Exam"],
  "South Korea": ["CSAT", "TOPIK", "KOSAF Exam", "KMEAT"],
  Brazil: ["ENEM", "Celpe-Bras", "Fuvest", "Vestibular"],
};

const seedDatabase = async () => {
  try {
    // Insert country data
    const insertedCountries = await Country.insertMany(countries);

    // Prepare exam data linked to countries
    const exams = [];
    for (const country of insertedCountries) {
      const countryExams = examData[country.name]; // Get exams for the current country
      countryExams.forEach((examName) => {
        exams.push({
          name: examName,
          country: country._id, // Link exam to the country
          offline: Math.random() > 0.5, // Randomize offline availability
          online: Math.random() > 0.5, // Randomize online availability
        });
      });
    }

    // Insert all exams into the database
    await Exam.insertMany(exams);

    console.log("Database seeded successfully with multiple exams per country!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
