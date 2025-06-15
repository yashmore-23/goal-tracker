// Home.js
import React from "react";
import { Typography, Container, Paper, Box, Button, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Welcome to Goal Tracker
            </Typography>
            <Typography variant="h6" paragraph>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="/images/goal.png" alt="Goal illustration" width="100%" />
          </Grid>
        </Grid>
      </Paper>

      {/* Why Use This */}
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Why Use Goal Tracker?
        </Typography>
        <Typography>
          Most people struggle to keep track of goals and stay motivated. Our app offers reminders, AI help, and a structured roadmap to help you stay consistent and succeed.
        </Typography>
      </Box>

      {/* How It Works */}
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          How It Works
        </Typography>
        <ul>
          <li>Sign up and create your profile</li>
          <li>Add your goals and deadlines</li>
          <li>Use our AI assistant to build a personalized roadmap</li>
          <li>Set reminders and track your progress daily</li>
        </ul>
      </Box>

      {/* Features */}
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          What It Offers
        </Typography>
        <Grid container spacing={2}>
          {["Goal Management", "Smart Reminders", "AI Roadmap", "Progress Tracking"].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{feature}</Typography>
                  <Typography variant="body2">
                    Explore how this feature helps you stay organized and motivated.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
