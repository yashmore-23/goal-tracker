// src/components/LoginForm.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import { TextField, Button, Paper, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook to navigate after login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post(
  "/auth/login",
  new URLSearchParams({ username, password }),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
);

      if (res.data.access_token) {
        login(res.data.access_token);  // Store the token via context
        navigate("/home");  // Redirect to the home page after login
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
          disabled={loading}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          disabled={loading}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;

