// const express = require("express");
// const router = express.Router();
// const Country = require("../models/Country");
// const Exam = require("../models/Exam");
// const { OpenAI } = require("openai");
// const dotenv = require("dotenv");
// const { Storage } = require("@google-cloud/storage");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// dotenv.config();

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// // Initialize Google Cloud Storage
// const storage = new Storage({
//   projectId: process.env.GCLOUD_PROJECT_ID,
//   keyFilename: process.env.GCLOUD_KEY_FILE, // Ensure this file is properly configured
// });

// const bucketName = process.env.GCS_BUCKET_NAME;

// Get all countries


// // Get exams for a specific country
// router.get("/exams/:countryId", async (req, res) => {
//   try {
//     const exams = await Exam.find({ country: req.params.countryId });
//     res.json(exams);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get exam options (offline/online) for a specific exam
// router.get("/test-options/:examId", async (req, res) => {
//   try {
//     const exam = await Exam.findById(req.params.examId);
//     res.json(exam);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Generate test using Gemini API
// router.get("/generate-test/:examId", async (req, res) => {
//   try {
//     const exam = await Exam.findById(req.params.examId);
//     if (!exam) return res.status(404).json({ message: "Exam not found" });

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     const prompt = `
//       Generate a **complete, random sample question paper** for the '${exam.name}' exam.

//       ✅ **DO NOT SHOW ANSWERS IN THE TEST PAPER.**
//       ✅ **PROVIDE ANSWERS SEPARATELY UNDER "Answer Key" SO IT CAN BE STORED.**
//       ✅ **FOLLOW THE STRUCTURE & FORMAT EXACTLY LIKE THE REAL EXAM.**

//       **Exam Title**: ${exam.name} - Sample Question Paper

//       **Instructions:**
//       1. Answer all questions.
//       2. Total Time: [X hours].
//       3. Marks for each question are indicated.

//       **Questions Section**
//       1. [Question 1] [Marks]
//       2. [Question 2] [Marks]
//       3. [Question 3] [Marks]
//       ...

//       **End of Question Paper**

//       ---
//       **Answer Key:**
//       1. Answer for Q1
//       2. Answer for Q2
//       ...
//     `;

//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();
    
//     if (!responseText) return res.status(500).json({ message: "Error generating test." });

//     // Extract answers and store them
//     const { testContent, answers } = extractAnswers(responseText);
//     const answerKeyURL = await storeAnswerInCloud(req.params.examId, answers);

//     res.json({ testContent, answerKeyURL });
//   } catch (error) {
//     res.status(500).json({ message: "Error generating test", error: error.message });
//   }
// });

// // Upload and evaluate answer sheet
// router.post("/upload-answer-sheet", async (req, res) => {
//   try {
//     const { examId, imageUrl } = req.body;
//     if (!examId || !imageUrl) return res.status(400).json({ message: "Missing examId or imageUrl" });

//     const extractedAnswers = await processImageWithVision(imageUrl);
//     if (!extractedAnswers.length) return res.status(400).json({ message: "No answers extracted. Check file format." });

//     const storedAnswers = await retrieveAnswerFromCloud(examId);
//     if (!storedAnswers) return res.status(500).json({ message: "Stored answers not found." });

//     const score = calculateScore(extractedAnswers, storedAnswers);
//     const explanations = await generateExplanations(extractedAnswers, storedAnswers);

//     res.json({ score, explanations });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing answer sheet", error: error.message });
//   }
// });


// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });
















// ... existing code ...

// // Add this route handler
// router.post("/evaluate", upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const examId = req.body.examId;
    
//     // Upload file to Google Cloud Storage
//     const bucket = storage.bucket(bucketName);
//     const blob = bucket.file(`submissions/${examId}/${req.file.originalname}`);
//     const blobStream = blob.createWriteStream();

//     blobStream.on('error', (error) => {
//       console.error('Error uploading to GCS:', error);
//       res.status(500).json({ message: "Error uploading file" });
//     });

//     blobStream.on('finish', async () => {
//       // Get the public URL
//       const publicUrl = `https://storage.googleapis.com/${bucketName}/submissions/${examId}/${req.file.originalname}`;
      
//       try {
//         // Process the uploaded answer sheet
//         const extractedAnswers = await processImageWithVision(publicUrl);
//         const storedAnswers = await retrieveAnswerFromCloud(examId);
//         const score = calculateScore(extractedAnswers, storedAnswers);
        
//         res.json({ score });
//       } catch (error) {
//         console.error('Error processing file:', error);
//         res.status(500).json({ message: "Error processing file" });
//       }
//     });

//     blobStream.end(req.file.buffer);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: "Error uploading file" });
//   }
// });

// // Helper Functions
// function extractAnswers(generatedTest) {
//   const answerKeyRegex = /\*\*Answer Key:\*\*(.*)$/s;
//   const match = generatedTest.match(answerKeyRegex);

//   if (match) {
//     const answers = match[1].trim();
//     const testContent = generatedTest.replace(answerKeyRegex, "").trim();
//     return { testContent, answers };
//   }

//   return { testContent: generatedTest, answers: "" };
// }

// async function storeAnswerInCloud(examId, answers) {
//   if (!answers) return null;

//   const fileName = `answers/${examId}.txt`;
//   const file = storage.bucket(bucketName).file(fileName);

//   await file.save(answers, { contentType: "text/plain" });

//   return `https://storage.googleapis.com/${bucketName}/${fileName}`;
// }

// async function retrieveAnswerFromCloud(examId) {
//   try {
//     const fileName = `answers/${examId}.txt`;
//     const file = storage.bucket(bucketName).file(fileName);
//     const [data] = await file.download();
//     return data.toString();
//   } catch (error) {
//     console.error("Error retrieving answers:", error);
//     return null;
//   }
// }



















// module.exports = router;



// // Helper Function to Calculate Score
// function calculateScore(extractedAnswers, storedAnswers) {
//   const extractedList = extractedAnswers.split("\n").map(ans => ans.trim());
//   const storedList = storedAnswers.split("\n").map(ans => ans.trim());

//   let totalQuestions = storedList.length;
//   let correctAnswers = 0;

//   for (let i = 0; i < totalQuestions; i++) {
//     if (extractedList[i] && extractedList[i].toLowerCase() === storedList[i].toLowerCase()) {
//       correctAnswers++;
//     }
//   }

//   let score = (correctAnswers / totalQuestions) * 100;
//   return { correctAnswers, totalQuestions, score };
// }

// // Modify /evaluate Route
// // Helper Function to Calculate Score
// function calculateScore(extractedAnswers, storedAnswers) {
//   const extractedList = extractedAnswers.split("\n").map(ans => ans.trim());
//   const storedList = storedAnswers.split("\n").map(ans => ans.trim());

//   let totalQuestions = storedList.length;
//   let correctAnswers = 0;

//   for (let i = 0; i < totalQuestions; i++) {
//     if (extractedList[i] && extractedList[i].toLowerCase() === storedList[i].toLowerCase()) {
//       correctAnswers++;
//     }
//   }

//   let score = (correctAnswers / totalQuestions) * 100;
//   return { correctAnswers, totalQuestions, score };
// }

// // Modify /evaluate Route
// router.post("/evaluate", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const examId = req.body.examId;

//     // Upload file to Google Cloud Storage
//     const bucket = storage.bucket(bucketName);
//     const blob = bucket.file(`submissions/${examId}/${req.file.originalname}`);
//     const blobStream = blob.createWriteStream();

//     blobStream.on("error", (error) => {
//       console.error("Error uploading to GCS:", error);
//       res.status(500).json({ message: "Error uploading file" });
//     });

//     blobStream.on("finish", async () => {
//       // Get the public URL
//       const publicUrl = `https://storage.googleapis.com/${bucketName}/submissions/${examId}/${req.file.originalname}`;

//       try {
//         // Process the uploaded answer sheet
//         const extractedAnswers = await processImageWithVision(publicUrl);
//         const storedAnswers = await retrieveAnswerFromCloud(examId);

//         if (!storedAnswers) {
//           return res.status(500).json({ message: "Stored answers not found." });
//         }

//         // Calculate Score
//         const { correctAnswers, totalQuestions, score } = calculateScore(extractedAnswers, storedAnswers);

//         res.json({ correctAnswers, totalQuestions, score });
//       } catch (error) {
//         console.error("Error processing file:", error);
//         res.status(500).json({ message: "Error processing file" });
//       }
//     });

//     blobStream.end(req.file.buffer);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Error uploading file" });
//   }
// });
















const express = require("express");
const router = express.Router();
const Country = require("../models/Country");
const Exam = require("../models/Exam");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE,
});
const bucketName = process.env.GCS_BUCKET_NAME;

// Initialize Google Vision API
const visionClient = new vision.ImageAnnotatorClient({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE,
});

// Multer configuration for file uploads
const uploadMiddleware = multer({ dest: "uploads/" });

// Helper Functions
function extractAnswers(responseText) {
  const delimiter = "---";
  const parts = responseText.split(delimiter);
  return {
    testContent: parts[0].trim(),
    answers: parts[1] ? parts[1].replace("**Answer Key:**", "").trim() : "",
  };
}

async function storeAnswerInCloud(examId, answers) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`answers/${examId}.txt`);

    // Check if the file already exists and delete it if it does
    const [exists] = await file.exists();
    if (exists) {
      console.log(`Deleting existing file for examId ${examId}...`);
      await file.delete();
    }

    // Save the new answers to the file
    await file.save(answers);
    console.log(`File uploaded to ${bucketName}/answers/${examId}.txt`);
    return `https://storage.googleapis.com/${bucketName}/answers/${examId}.txt`;
  } catch (error) {
    console.error("Error uploading file to GCS:", error.message);
    throw new Error("Failed to upload file to GCS.");
  }
}

async function retrieveAnswerFromCloud(examId) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`answers/${examId}.txt`);
  try {
    const [data] = await file.download();
    return data.toString();
  } catch (error) {
    console.error("Error retrieving stored answers:", error);
    return null;
  }
}

// Generate Test with MCQs, Short Answer, and Long Answer Questions
router.get("/generate-test/:examId", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `
      Generate a **complete, random sample question paper** for the '${exam.name}' exam.
      ✅ **Include the following types of questions:**
      1. **Multiple Choice Questions (MCQs):** 10 questions with options A, B, C, D.
      2. **Short Answer Questions:** 5 questions requiring brief answers (1-2 sentences).
      3. **Long Answer Questions:**
         - 1 question involving detailed mathematical calculations (e.g., calculus, algebra, geometry).
         - 1 question involving graph interpretation or analysis (e.g., plotting graphs, analyzing trends).
         - 1 general long-answer question requiring detailed explanations.
      ✅ **DO NOT SHOW ANSWERS IN THE TEST PAPER.**
      ✅ **PROVIDE ANSWERS SEPARATELY UNDER "Answer Key" USING THE FOLLOWING FORMAT:**
      **Answer Key:**
      **MCQs:**
      1. Correct option for Q1 (e.g., A, B, C, or D)
      2. Correct option for Q2 (e.g., A, B, C, or D)
      ...
      **Short Answer Questions:**
      1. Correct answer for Q1
      2. Correct answer for Q2
      ...
      **Long Answer Questions:**
      1. Step-by-step solution for the mathematical calculation question.
      2. Detailed analysis and interpretation of the graph.
      3. Correct answer for the general long-answer question.
      ...
      ✅ **SEPARATE THE TEST PAPER AND ANSWER KEY WITH A DELIMITER '---'.**
      **Exam Title**: ${exam.name} - Sample Question Paper
      **Instructions:**
      1. Answer all questions.
      2. Total Time: [X hours].
      3. Marks for each question are indicated.
      **Questions Section**
      **MCQs:**
      1. [Question 1]
         A. [Option A]
         B. [Option B]
         C. [Option C]
         D. [Option D]
         [Marks]
      2. [Question 2]
         A. [Option A]
         B. [Option B]
         C. [Option C]
         D. [Option D]
         [Marks]
      ...
      **Short Answer Questions:**
      1. [Question 1]
         [Marks]
      2. [Question 2]
         [Marks]
      ...
      **Long Answer Questions:**
      1. [Mathematical Calculation Question]
         Solve the following problem step-by-step:
         [Problem description]
         [Marks]
      2. [Graph Interpretation Question]
         Analyze the given graph and answer the following:
         [Graph description]
         [Marks]
      3. [General Long Answer Question]
         [Question description]
         [Marks]
      ...
      **End of Question Paper**
      ---
      **Answer Key:**
      **MCQs:**
      1. Correct option for Q1 (e.g., A, B, C, or D)
      2. Correct option for Q2 (e.g., A, B, C, or D)
      ...
      **Short Answer Questions:**
      1. Correct answer for Q1
      2. Correct answer for Q2
      ...
      **Long Answer Questions:**
      1. Step-by-step solution for the mathematical calculation question.
      2. Detailed analysis and interpretation of the graph.
      3. Correct answer for the general long-answer question.
      ...
    `;
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    if (!responseText) return res.status(500).json({ message: "Error generating test." });

    console.log("Gemini API raw response:", responseText); // Log raw response for debugging

    const { testContent, answers } = extractAnswers(responseText);

    if (!testContent || !answers) {
      console.error("Error: Incomplete test or answers generated.");
      return res.status(500).json({ message: "Error generating test or answers." });
    }

    const answerKeyURL = await storeAnswerInCloud(req.params.examId, answers);

    res.json({ testContent, answerKeyURL });
  } catch (error) {
    console.error("Error generating test:", error.message);
    res.status(500).json({ message: "Error generating test", error: error.message });
  }
});


router.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
    console.log("Countries retrieved successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get exams for a specific country
router.get("/exams/:countryId", async (req, res) => {
  try {
    const exams = await Exam.find({ country: req.params.countryId });
    if (!exams || exams.length === 0) {
      return res.status(404).json({ message: "No exams found for this country." });
    }
    res.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error.message);
    res.status(500).json({ message: "Failed to load exams. Please try again later." });
  }
});

// Get exam options (offline/online) for a specific exam
router.get("/test-options/:examId", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Evaluate Answers with AI Comparison
router.post("/evaluate", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { examId } = req.body;
    const file = req.file;

    // Validate inputs
    if (!examId || !file) {
      console.error("Error: Missing examId or file.");
      return res.status(400).json({ message: "Missing examId or file." });
    }

    console.log(`Received file for evaluation. Exam ID: ${examId}, File: ${file.originalname}`);

    const filePath = path.resolve(file.path);
    let extractedText;

    try {
      console.log("Processing file with Vision API...");
      const [result] = await visionClient.textDetection(filePath);
      extractedText = result.fullTextAnnotation?.text || "";

      if (!extractedText) {
        console.error("Error: No text extracted from the file.");
        return res.status(400).json({ message: "No text extracted from the file." });
      }

      console.log("Extracted text:", extractedText);
    } catch (visionError) {
      console.error("Error during Vision API call:", visionError.message);
      return res.status(500).json({ message: "Error processing file with Vision API", error: visionError.message });
    } finally {
      try {
        fs.unlinkSync(filePath);
        console.log("Temporary file deleted successfully.");
      } catch (unlinkError) {
        console.error("Error deleting temporary file:", unlinkError.message);
      }
    }

    let storedAnswers;
    try {
      console.log("Retrieving stored answers for examId:", examId);
      storedAnswers = await retrieveAnswerFromCloud(examId);

      if (!storedAnswers) {
        console.error(`Error: No stored answers found for examId ${examId}.`);
        return res.status(500).json({ message: "Stored answers not found." });
      }

      console.log("Stored answers retrieved successfully.");
    } catch (gcsError) {
      console.error("Error retrieving stored answers:", gcsError.message);
      return res.status(500).json({ message: "Error retrieving stored answers", error: gcsError.message });
    }

    // Compare answers using AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `
      Compare the following two sets of answers and provide a score based on their similarity:
      **Extracted Answers:**
      ${extractedText}
      **Stored Answers:**
      ${storedAnswers}
      **Instructions:**
      1. Compare each answer line by line.
      2. Provide a similarity score between 0 and 100.
      3. Return the score in the following format:
         **Score:** [score]%
    `;

    try {
      console.log("Generating comparison with Gemini API...");
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      console.log("Gemini API raw response:", responseText); // Log raw response for debugging

      // Clean the response by trimming and removing extra spaces/newlines
      const cleanedResponse = responseText.trim().replace(/\s+/g, " ");
      console.log("Cleaned Gemini API response:", cleanedResponse);

      // Extract the score directly without regex
      const scoreKeyword = "**Score:** ";
      const scoreIndex = cleanedResponse.indexOf(scoreKeyword);
      let score = 0; // Default score

      if (scoreIndex !== -1) {
        const scoreSubstring = cleanedResponse.substring(scoreIndex + scoreKeyword.length);
        const numericScore = parseInt(scoreSubstring, 10);
        if (!isNaN(numericScore)) {
          score = numericScore;
        }
      }

      console.log(`Extracted score: ${score}%`);
      console.log(`Evaluation complete. Final Score: ${score}%`);

      res.json({
        score: score,
      });
    } catch (aiError) {
      console.error("Error during Gemini API call:", aiError.message);
      return res.status(500).json({ message: "Error comparing answers", error: aiError.message });
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: "Error evaluating file", error: error.message });
  }
});


router.post("/submit-answers", async (req, res) => {
  try {
    const { examId, answers } = req.body;

    // Store user answers in the cloud
    const bucket = storage.bucket(bucketName);
    const userAnswerFile = bucket.file(`user-answers/${examId}.txt`);
    await userAnswerFile.save(JSON.stringify(answers));
    console.log(`User answers uploaded to ${bucketName}/user-answers/${examId}.txt`);

    // Retrieve stored correct answers
    const correctAnswers = await retrieveAnswerFromCloud(examId);
    if (!correctAnswers) {
      return res.status(500).json({ message: "Stored answers not found." });
    }

    // Compare answers using Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `
      Compare the following two sets of answers and provide a score based on their similarity:
      Extracted Answers: ${JSON.stringify(answers)}
      Stored Answers: ${correctAnswers}
      Instructions:
      1. Compare each answer line by line.
      2. Provide a similarity score between 0 and 100.
      3. Return the score in the following format: Score: [score]%
    `;
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const score = extractScore(responseText);

    res.json({ score });
  } catch (error) {
    console.error("Error submitting answers:", error.message);
    res.status(500).json({ message: "Error submitting answers", error: error.message });
  }
});

function extractScore(responseText) {
  const scoreKeyword = "Score:";
  const scoreIndex = responseText.indexOf(scoreKeyword);
  if (scoreIndex === -1) return 0;
  const scoreSubstring = responseText.substring(scoreIndex + scoreKeyword.length).trim();
  const numericScore = parseInt(scoreSubstring, 10);
  return isNaN(numericScore) ? 0 : numericScore;
}

module.exports = router;