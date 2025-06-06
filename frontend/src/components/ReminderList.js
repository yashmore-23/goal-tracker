// Final Optimized ReminderList.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import API from "../api";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await API.get("/reminders/");
        setReminders(response.data);
      } catch (err) {
        setError("Failed to fetch reminders.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchReminders();
  }, [token]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Reminders
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <CircularProgress />
        ) : reminders.length === 0 ? (
          <Typography>No reminders found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {reminders.map((reminder) => (
              <Grid item xs={12} sm={6} md={4} key={reminder.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{reminder.title}</Typography>
                    <Typography color="text.secondary">
                      {reminder.description}
                    </Typography>
                    <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                      View Reminder
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default ReminderList;
