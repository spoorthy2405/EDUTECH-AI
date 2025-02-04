import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CountryExam from "./pages/CountryExam";
import TestOptions from "./pages/TestOptions";
import TestPage from "./pages/TestPage";

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
      </Routes>
    </Router>
  );
}

export default App;
