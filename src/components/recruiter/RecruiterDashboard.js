import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Alert,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { AuthContext } from '../../context/AuthContext';
import { AlertContext } from '../../context/AlertContext';
import PersonIcon from '@mui/icons-material/Person';

const RecruiterDashboard = () => {
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [shortlistedTalent, setShortlistedTalent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        
        // Fetch recruiter profile
        const profileRes = await axios.get('/recruiter/me');
        setProfile(profileRes.data);
        
        // Fetch shortlisted talent
        const shortlistRes = await axios.get('/recruiter/shortlist');
        setShortlistedTalent(shortlistRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
          }}
        >
          <CircularProgress />
          <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Something went wrong
          </Typography>
          <Typography paragraph>
            We couldn't load your dashboard information. Please try again later or contact support.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user.firstName}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {user.company}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem
                button
                component={RouterLink}
                to="/recruiter/search"
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon>
                  <PersonSearchIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Search Talent" 
                  secondary="Find qualified candidates"
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/recruiter/shortlist"
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon>
                  <BookmarkIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="View Shortlist" 
                  secondary={`${shortlistedTalent?.length || 0} candidates`}
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/recruiter/profile"
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Edit Profile" 
                  secondary="Update your company information"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Dashboard Overview */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper 
                  variant="outlined" 
                  sx={{ p: 2, textAlign: 'center' }}
                >
                  <BookmarkIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" gutterBottom>
                    {shortlistedTalent?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Shortlisted Candidates
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper 
                  variant="outlined" 
                  sx={{ p: 2, textAlign: 'center' }}
                >
                  <PersonSearchIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" gutterBottom>
                    {profile?.recentSearches?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Recent Searches
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/recruiter/search"
                fullWidth
              >
                Start Searching Candidates
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecruiterDashboard; 