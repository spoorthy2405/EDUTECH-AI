function extractAnswers(testContent) {
    return testContent.split("\n")
      .filter(line => line.includes("Answer:"))
      .map(line => line.replace("Answer:", "").trim());
  }
  
  function removeAnswersFromTest(testContent) {
    return testContent.split("\n").filter(line => !line.includes("Answer:")).join("\n");
  }
  
  function calculateScore(userAnswers, correctAnswers) {
    let score = 0;
    userAnswers.forEach((ans, i) => {
      if (ans.toLowerCase() === correctAnswers[i]?.toLowerCase()) score++;
    });
    return score;
  }
  
  async function generateExplanations(userAnswers, correctAnswers) {
    // Call OpenAI to generate explanations
  }
  
  module.exports = { extractAnswers, removeAnswersFromTest, calculateScore, generateExplanations };
  