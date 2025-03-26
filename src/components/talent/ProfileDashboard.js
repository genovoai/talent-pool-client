import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Grid, Paper, Avatar, Typography, Tabs, Tab, CircularProgress, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext';
import { AuthContext } from '../../context/AuthContext';
import DashboardPanel from './profile-tabs/DashboardPanel';
import PersonalProfilePanel from './profile-tabs/PersonalProfilePanel';
import TalentProfilePanel from './profile-tabs/TalentProfilePanel';
import AccountSettingsPanel from './profile-tabs/AccountSettingsPanel';

// Custom styled components
const ProfileSidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ProfileDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = parseInt(queryParams.get('tab') || '0');
  
  const [tabValue, setTabValue] = useState(initialTab);
  const { user } = useContext(AuthContext);
  const { profile, loading, getCurrentProfile } = useContext(ProfileContext);
  
  useEffect(() => {
    getCurrentProfile();
  }, []);
  
  // Update tab value if query parameter changes
  useEffect(() => {
    const tabParam = parseInt(queryParams.get('tab') || '0');
    if (tabParam >= 0 && tabParam <= 3) {
      setTabValue(tabParam);
    }
  }, [location.search]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  // Get first letter for avatar
  const getInitial = () => {
    return user?.firstName ? user.firstName[0].toUpperCase() : '?';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <ProfileSidebar elevation={2}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                fontSize: 48,
                mb: 2,
                bgcolor: 'primary.main' 
              }}
            >
              {getInitial()}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {profile?.title || 'Add your professional title'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profile?.location || 'Location not specified'}
            </Typography>
            {user?.email && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {user.email}
              </Typography>
            )}
            <Divider sx={{ width: '100%', my: 2 }} />
            <Typography variant="body2" align="center" sx={{ px: 2, mt: 1 }}>
              Complete your profile to be discovered by recruiters in our blind-matching talent platform.
            </Typography>
          </ProfileSidebar>
        </Grid>
        
        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper elevation={2}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="profile tabs"
                variant="fullWidth"
              >
                <Tab label="Dashboard" />
                <Tab label="Personal Profile" />
                <Tab label="Talent Profile" />
                <Tab label="Account Settings" />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <DashboardPanel profile={profile} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <PersonalProfilePanel profile={profile} user={user} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <TalentProfilePanel profile={profile} />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <AccountSettingsPanel />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileDashboard; 