import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const TestPage = () => {
  const { examId } = useParams();
  const [testContent, setTestContent] = useState(null);
  const [examTimer, setExamTimer] = useState(3 * 60 * 60); // 3 hours in seconds
  const [uploadTimer, setUploadTimer] = useState(0); // 2-minute timer
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        console.log("Fetching test for examId:", examId);
        const result = await axios.get(`http://localhost:5000/quiz/generate-test/${examId}`);
        console.log("Test fetched successfully:", result.data);
        setTestContent(result.data.testContent);
      } catch (error) {
        console.error("Error fetching test:", error);
        alert("Failed to load test content. Please try again.");
      }
    };
    fetchTest();
  }, [examId]);

  useEffect(() => {
    let interval;
    if (!isExamEnded && examTimer > 0) {
      interval = setInterval(() => setExamTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isExamEnded, examTimer]);

  useEffect(() => {
    let interval;
    if (isExamEnded && uploadTimer > 0) {
      interval = setInterval(() => setUploadTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [uploadTimer]);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(testContent, 10, 10);
    doc.save(`Exam_${examId}.pdf`);
  };

  const handleEndExam = () => {
    setIsExamEnded(true);
    setUploadTimer(20 * 60); // Start 2-minute timer
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return alert("Please select a file to upload!");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("examId", examId);

    try {
      console.log("Uploading file for examId:", examId);
      const result = await axios.post("http://localhost:5000/quiz/evaluate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", result.data);
      alert(`Exam evaluated! Your Score: ${result.data.score}%`);
    } catch (error) {
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
      alert("Error uploading file. Please try again.");
    }
  };

  if (testContent === null) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const formattedContent = testContent
    .split("\n")
    .map((line, index) => <p key={index} style={styles.paragraph}>{line.trim()}</p>);

  return (
    <div style={styles.container}>
      <div style={styles.timer}>
        {isExamEnded
          ? `Upload Timer: ${Math.floor(uploadTimer / 60)}:${uploadTimer % 60}`
          : `Exam Timer: ${Math.floor(examTimer / 3600)}:${Math.floor((examTimer % 3600) / 60)}:${examTimer % 60}`}
      </div>
      <h1 style={styles.header}>Test for {examId}</h1>
      <div style={styles.content}>{formattedContent}</div>
      {!isExamEnded ? (
        <div>
          <button style={styles.button} onClick={handleDownload}>Download Exam</button>
          <button style={styles.button} onClick={handleEndExam}>End Exam</button>
        </div>
      ) : uploadTimer > 0 ? (
        <>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
          />
          <button style={styles.button} onClick={handleFileUpload}>Upload & Evaluate</button>
        </>
      ) : (
        <div style={styles.error}>Upload time expired!</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
    backgroundColor: "#f4f7fb",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  content: {
    fontSize: "1rem",
    color: "#555",
  },
  paragraph: {
    marginBottom: "15px",
    textAlign: "justify",
  },
  timer: {
    textAlign: "right",
    fontSize: "1.2rem",
    color: "#444",
    marginBottom: "20px",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  fileInput: {
    display: "block",
    margin: "20px auto",
    fontSize: "1rem",
  },
  error: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "red",
  },
};

export default TestPage;