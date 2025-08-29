import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CountryExam from "./pages/CountryExam";
import TestOptions from "./pages/TestOptions";
import TestPage from "./pages/TestPage";
import MCQPage from "./pages/MCQPage";
import PreviousPapers from './pages/PreviousPapers';
import YouTubeStudyMaterial from "./pages/YouTubeStudyMaterial";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/country-exam/:countryId" element={<CountryExam />} />
        <Route path="/test-options/:examId" element={<TestOptions />} />
        <Route path="/test/:examId/:type" element={<TestPage />} /> 
        <Route path="/mcq/:examId" element={<MCQPage />} />
        <Route path="/PreviousPapers/:examId" element={<PreviousPapers />} />
        <Route path="/youtube-material/:examName" element={<YouTubeStudyMaterial />} />
      </Routes>
    </Router>
  );
}

export default App;
