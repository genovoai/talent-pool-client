import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Divider,
  Button,
  Chip,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { ProfileContext } from '../../../context/ProfileContext';
import { AuthContext } from '../../../context/AuthContext';

const DashboardPanel = () => {
  const { profile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  const [profileCompletion, setProfileCompletion] = useState(0);
  
  useEffect(() => {
    // Calculate profile completion percentage
    if (profile) {
      let completedItems = 0;
      let totalItems = 6; // Total number of profile items to complete
      
      if (profile.headline) completedItems++;
      if (profile.summary) completedItems++;
      if (profile.skills && profile.skills.length > 0) completedItems++;
      if (profile.location) completedItems++;
      if (profile.title) completedItems++;
      if (profile.sponsorshipRequired !== undefined) completedItems++;
      
      setProfileCompletion(Math.round((completedItems / totalItems) * 100));
    }
  }, [profile]);
  
  // Determine profile completion status color
  const getCompletionColor = () => {
    if (profileCompletion < 40) return 'error';
    if (profileCompletion < 70) return 'warning';
    return 'success';
  };
  
  // Get missing profile items
  const getMissingItems = () => {
    const missing = [];
    
    if (!profile?.headline) missing.push('Professional Headline');
    if (!profile?.summary) missing.push('Profile Summary');
    if (!profile?.skills || profile.skills.length === 0) missing.push('Skills');
    if (!profile?.location) missing.push('Location');
    if (!profile?.title) missing.push('Professional Title');
    if (profile?.sponsorshipRequired === undefined) missing.push('Sponsorship Information');
    
    return missing;
  };
  
  const missingItems = getMissingItems();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      
      <Alert severity="info" sx={{ mb: 4 }}>
        Welcome to the talent pool platform! Complete your profile to be discovered by recruiters.
      </Alert>
      
      {/* How It Works */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <InfoIcon sx={{ mr: 2, mt: 0.5 }} color="primary" />
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Complete your profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fill in your professional information including skills and experience.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <InfoIcon sx={{ mr: 2, mt: 0.5 }} color="primary" />
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Get discovered
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recruiters review anonymous professional profiles without seeing personal details.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <InfoIcon sx={{ mr: 2, mt: 0.5 }} color="primary" />
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Receive opportunity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  When a recruiter is interested, we'll notify you about the opportunity while keeping your identity private.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Profile Completion Card */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            Profile Completion: {profileCompletion}%
          </Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={profileCompletion} 
          color={getCompletionColor()} 
          sx={{ height: 8, borderRadius: 4, mb: 3 }}
        />
        
        {profileCompletion < 100 && (
          <>
            <Typography variant="body1" paragraph>
              Complete your profile to increase visibility to recruiters and improve matching opportunities.
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Missing Information:
              </Typography>
              <Grid container spacing={1}>
                {missingItems.map((item, index) => (
                  <Grid item key={index}>
                    <Chip 
                      icon={<ErrorIcon />} 
                      label={item} 
                      color="error" 
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  // Navigate to the personal profile section
                  document.querySelector('[aria-label="profile tabs"] button:nth-child(2)')?.click();
                }}
              >
                Update Personal Details
              </Button>
              
              <Button 
                variant="contained" 
                color="secondary"
                onClick={() => {
                  // Navigate to the talent profile section
                  document.querySelector('[aria-label="profile tabs"] button:nth-child(3)')?.click();
                }}
              >
                Update Professional Profile
              </Button>
            </Box>
          </>
        )}
        
        {profileCompletion === 100 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Your profile is complete! You're now visible to recruiters looking for your skills.
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default DashboardPanel; 