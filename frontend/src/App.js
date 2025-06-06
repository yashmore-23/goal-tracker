import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import AIChat from './components/AIChat';
import RoadmapAI from './components/RoadmapAI';
import { Box } from '@mui/material';

function App({ darkMode, setDarkMode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/goals" element={<GoalList />} />
          <Route path="/goals/create" element={<GoalForm />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/roadmap" element={<RoadmapAI />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
