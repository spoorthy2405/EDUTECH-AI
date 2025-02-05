import React, { useEffect, useState } from "react";
import axios from "axios";

const MCQPage = ({ match }) => {
  const { examId } = match.params;
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quiz/generate-test/${examId}`);
        const { testContent } = response.data;
        // Parse the test content into an array of questions
        const parsedQuestions = parseTestContent(testContent);
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Error fetching test:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [examId]);

  const parseTestContent = (content) => {
    const lines = content.split("\n");
    const mcqs = [];
    let currentQuestion = null;

    lines.forEach((line) => {
      if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
        if (currentQuestion) {
          mcqs.push(currentQuestion);
        }
        currentQuestion = { question: line, options: [], answer: "" };
      } else if (line.startsWith("A.") || line.startsWith("B.") || line.startsWith("C.") || line.startsWith("D.")) {
        currentQuestion.options.push(line);
      } else if (line.includes("[Marks]")) {
        currentQuestion.marks = parseInt(line.match(/\d+/)[0], 10);
      }
    });

    if (currentQuestion) {
      mcqs.push(currentQuestion);
    }

    return mcqs;
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: prev[questionIndex]
        ? [...prev[questionIndex], option].filter((item, index, arr) => arr.indexOf(item) === index)
        : [option],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/quiz/submit-answers", {
        examId,
        answers: selectedAnswers,
      });
      setScore(response.data.score);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>MCQ Test</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          {q.options.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="checkbox"
                  value={option}
                  onChange={() => handleOptionChange(index, option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
      {score !== null && <p>Your Score: {score}%</p>}
    </div>
  );
};

export default MCQPage;