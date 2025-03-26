import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Button,
  Divider,
  Box,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../context/AuthContext';
import { AlertContext } from '../../context/AlertContext';

const Shortlist = () => {
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const [shortlistedTalent, setShortlistedTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be an API call to fetch shortlisted candidates
    const mockShortlistedTalent = [
      {
        _id: '1',
        talent: {
          _id: '101',
          user: {
            firstName: 'John',
            lastName: 'Doe'
          },
          headline: 'Senior Software Engineer',
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          location: 'San Francisco, CA',
          yearsOfExperience: 5
        },
        notes: 'Great candidate for the frontend position',
        dateAdded: new Date('2023-03-10')
      },
      {
        _id: '2',
        talent: {
          _id: '102',
          user: {
            firstName: 'Jane',
            lastName: 'Smith'
          },
          headline: 'Full Stack Developer',
          skills: ['Python', 'Django', 'React', 'PostgreSQL'],
          location: 'New York, NY',
          yearsOfExperience: 3
        },
        notes: 'Excellent communication skills',
        dateAdded: new Date('2023-03-12')
      },
      {
        _id: '3',
        talent: {
          _id: '103',
          user: {
            firstName: 'Michael',
            lastName: 'Johnson'
          },
          headline: 'DevOps Engineer',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
          location: 'Austin, TX',
          yearsOfExperience: 4
        },
        notes: 'Strong infrastructure background',
        dateAdded: new Date('2023-03-15')
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setShortlistedTalent(mockShortlistedTalent);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRemoveFromShortlist = (id) => {
    // In a real application, this would be an API call to remove a candidate from shortlist
    setShortlistedTalent(shortlistedTalent.filter(item => item._id !== id));
    setAlert('Candidate removed from shortlist', 'success');
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Shortlisted Candidates
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your shortlisted candidates and view their profiles.
        </Typography>

        {shortlistedTalent.length > 0 ? (
          <List>
            {shortlistedTalent.map((item) => (
              <React.Fragment key={item._id}>
                <ListItem 
                  component={Paper} 
                  elevation={1}
                  sx={{ mb: 2, p: 2, borderRadius: 1 }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      {item.talent.user.firstName[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        {`${item.talent.user.firstName} ${item.talent.user.lastName}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                          {item.talent.headline}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                          {item.talent.skills.map((skill, idx) => (
                            <Chip 
                              key={idx} 
                              label={skill} 
                              size="small" 
                              variant="outlined" 
                            />
                          ))}
                        </Box>
                        <Typography variant="body2">
                          {item.talent.location} • {item.talent.yearsOfExperience} years of experience
                        </Typography>
                        {item.notes && (
                          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                            Notes: {item.notes}
                          </Typography>
                        )}
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          Added on {item.dateAdded.toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <IconButton 
                        edge="end" 
                        component={RouterLink}
                        to={`/recruiter/talent/${item.talent._id}`}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveFromShortlist(item._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Alert severity="info" sx={{ mt: 2 }}>
            You haven't shortlisted any candidates yet. Search for talent and start building your shortlist.
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/recruiter/search"
          >
            Search for Talent
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Shortlist; 