// src/components/Home.js
import React from "react";
import { Typography, Container, Paper, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Goal Tracker
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Track your goals, set reminders, and generate custom AI roadmaps to help you stay on track.
        </Typography>

        {!token ? (
          <Box>
            <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/register">
              Sign Up
            </Button>
          </Box>
        ) : (
          <Box>
            <Button variant="contained" color="primary" component={Link} to="/goals">
              View Your Goals
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Home;

