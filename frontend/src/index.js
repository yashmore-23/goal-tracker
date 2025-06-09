import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

function RootWithTheme() {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem('darkMode') === 'true'
  );

  React.useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <App darkMode={darkMode} setDarkMode={setDarkMode} />
      </AuthProvider>
    </ThemeProvider>
  );
}

root.render(
  <BrowserRouter>
    <RootWithTheme />
  </BrowserRouter>
);
