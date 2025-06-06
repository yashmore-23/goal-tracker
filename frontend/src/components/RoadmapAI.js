// Final Optimized RoadmapAI.js
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";

function RoadmapAI() {
  const [goal, setGoal] = useState("");
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const questions = [
    "What is your goal?",
    "Why do you want to achieve this goal?",
    "What is your current skill level or progress toward this goal?",
    "What is your deadline or timeframe for achieving it?"
  ];

  const handleNext = () => {
    if (currentStep === 0 && !goal.trim()) return;
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentStep]: e.target.value });
    if (currentStep === 0) setGoal(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const compiledInput = `I want to achieve the following goal: ${goal}.\n\n` +
      questions.map((q, i) => `${q}\n${answers[i] || ""}`).join("\n\n");

    try {
      const response = await axios.post("http://localhost:8000/roadmap/generate-roadmap/", {
        goal: compiledInput,
      });
      setRoadmap(response.data.roadmap);
    } catch (err) {
      console.error(err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto", my: 4 }}>
      <Typography variant="h5" gutterBottom>
        AI Roadmap Assistant
      </Typography>

      <Stepper activeStep={currentStep} alternativeLabel>
        {questions.map((_, index) => (
          <Step key={index}>
            <StepLabel>{`Q${index + 1}`}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStep < questions.length ? (
        <>
          <Typography variant="body1" sx={{ mt: 2 }}>{questions[currentStep]}</Typography>
          <TextField
            fullWidth
            margin="normal"
            value={currentStep === 0 ? goal : answers[currentStep] || ""}
            onChange={handleAnswerChange}
          />
          <Button variant="outlined" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ ml: 2 }}
          >
            Next
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Roadmap"}
        </Button>
      )}

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {roadmap && (
        <Paper sx={{ mt: 4, p: 2, bgcolor: "#f4f4f4" }}>
          <Typography variant="h6">Personalized Roadmap</Typography>
          <Typography whiteSpace="pre-line">{roadmap}</Typography>
        </Paper>
      )}
    </Paper>
  );
}

export default RoadmapAI;
