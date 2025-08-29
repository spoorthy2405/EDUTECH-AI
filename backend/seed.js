const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Country = require("./models/Country");
const Exam = require("./models/Exam");

// Load environment variables
dotenv.config();

// Connect to MongoDB (Atlas)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ MongoDB connected to Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
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
      const countryExams = examData[country.name];
      countryExams.forEach((examName) => {
        exams.push({
          name: examName,
          country: country._id,
          offline: Math.random() > 0.5,
          online: Math.random() > 0.5,
        });
      });
    }

    // Insert all exams into the database
    await Exam.insertMany(exams);

    console.log("🎯 Database seeded successfully with multiple exams per country!");
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
