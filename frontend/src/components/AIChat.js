import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  CircularProgress,
  IconButton 
} from '@mui/material';
import { Send, SmartToy } from '@mui/icons-material';
import API from '../api';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your Goal Tracker AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await API.post('/ai/chat', {
        messages: [...messages, userMessage]
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.response 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        AI Goal Assistant
      </Typography>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: msg.role === 'assistant' ? '#1976d2' : '#9c27b0' }}>
                  {msg.role === 'assistant' ? <SmartToy /> : 'Y'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                secondary={
                  <Typography 
                    component="span" 
                    variant="body2" 
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {msg.content}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          {loading && (
            <ListItem>
              <CircularProgress size={24} />
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me about goal planning..."
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          startIcon={<Send />}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default AIChat;
