import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Public Components
import Landing from './components/layout/Landing';
import NotFound from './components/layout/NotFound';

// Talent Components
import ProfileDashboard from './components/talent/ProfileDashboard';

// Recruiter Components
import RecruiterDashboard from './components/recruiter/RecruiterDashboard';
import RecruiterProfileForm from './components/recruiter/ProfileForm';
import TalentSearch from './components/recruiter/TalentSearch';
import TalentDetail from './components/recruiter/TalentDetail';
import Shortlist from './components/recruiter/Shortlist';

// Route Protection Components
import PrivateRoute from './components/routing/PrivateRoute';
import TalentRoute from './components/routing/TalentRoute';
import RecruiterRoute from './components/routing/RecruiterRoute';

// Context
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { ProfileProvider } from './context/ProfileContext';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#2ecc71',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <ProfileProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Navbar />
              <Alert />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/talent" element={<Login initialRole="talent" />} />
                <Route path="/login/recruiter" element={<Login initialRole="recruiter" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/talent" element={<Register initialRole="talent" />} />
                <Route path="/register/recruiter" element={<Register initialRole="recruiter" />} />
                
                {/* Talent Routes */}
                <Route 
                  path="/talent/dashboard" 
                  element={
                    <TalentRoute>
                      <Navigate to="/talent/profile" replace />
                    </TalentRoute>
                  } 
                />
                <Route 
                  path="/talent/profile" 
                  element={
                    <TalentRoute>
                      <ProfileDashboard />
                    </TalentRoute>
                  } 
                />
                {/* Legacy routes redirect to appropriate tabs in ProfileDashboard */}
                <Route 
                  path="/talent/education" 
                  element={
                    <TalentRoute>
                      <Navigate to="/talent/profile?tab=1" replace />
                    </TalentRoute>
                  } 
                />
                <Route 
                  path="/talent/experience" 
                  element={
                    <TalentRoute>
                      <Navigate to="/talent/profile?tab=1" replace />
                    </TalentRoute>
                  } 
                />
                <Route 
                  path="/talent/resume" 
                  element={
                    <TalentRoute>
                      <Navigate to="/talent/profile?tab=2" replace />
                    </TalentRoute>
                  } 
                />
                
                {/* Recruiter Routes */}
                <Route 
                  path="/recruiter/dashboard" 
                  element={
                    <RecruiterRoute>
                      <RecruiterDashboard />
                    </RecruiterRoute>
                  } 
                />
                <Route 
                  path="/recruiter/profile" 
                  element={
                    <RecruiterRoute>
                      <RecruiterProfileForm />
                    </RecruiterRoute>
                  } 
                />
                <Route 
                  path="/recruiter/search" 
                  element={
                    <RecruiterRoute>
                      <TalentSearch />
                    </RecruiterRoute>
                  } 
                />
                <Route 
                  path="/recruiter/talent/:id" 
                  element={
                    <RecruiterRoute>
                      <TalentDetail />
                    </RecruiterRoute>
                  } 
                />
                <Route 
                  path="/recruiter/shortlist" 
                  element={
                    <RecruiterRoute>
                      <Shortlist />
                    </RecruiterRoute>
                  } 
                />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </Router>
          </ThemeProvider>
        </ProfileProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App; 