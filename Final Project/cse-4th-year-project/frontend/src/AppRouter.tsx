import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FrontPage from './pages/FrontPage';
import LoginSignup from './pages/LoginSignup';

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);};

  const handleLogout = () => {
    setIsAuthenticated(false);};
   return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <FrontPage />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup onSignup={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/get-started"
            element={!isAuthenticated ? <LoginSignup onLogin={handleLogin} onSignup={handleLogin} /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
