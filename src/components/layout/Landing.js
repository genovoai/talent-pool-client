import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';

const Landing = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, mb: 5, textAlign: 'center' }}
      >
        Welcome to Talent Pool
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={4}
            sx={{ 
              p: 4,
              height: '100%',
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight={600}>
              For Talent
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
              • Create your professional profile
              <br />
              • Showcase your skills
              <br />
              • Connect with top companies
              <br />
              • Find your next opportunity
            </Typography>
            <Button
              component={Link}
              to="/register/talent"
              variant="contained"
              size="large"
              startIcon={<WorkIcon />}
              fullWidth
              sx={{ 
                mt: 'auto', 
                py: 1.5, 
                backgroundColor: 'white', 
                color: 'primary.main',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                }
              }}
            >
              REGISTER AS JOB SEEKER
            </Button>
            <Button
              component={Link}
              to="/login/talent"
              variant="outlined"
              size="medium"
              color="inherit"
              fullWidth
              sx={{ 
                mt: 2, 
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white'
                }
              }}
            >
              ALREADY HAVE AN ACCOUNT? LOG IN
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={4}
            sx={{ 
              p: 4,
              height: '100%',
              backgroundColor: 'secondary.main',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight={600}>
              For Recruiters
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
              • Search qualified candidates
              <br />
              • Review detailed profiles
              <br />
              • Create shortlists
              <br />
              • Connect with talent
            </Typography>
            <Button
              component={Link}
              to="/register/recruiter"
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              fullWidth
              sx={{ 
                mt: 'auto', 
                py: 1.5, 
                backgroundColor: 'white', 
                color: 'secondary.main',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                }
              }}
            >
              REGISTER AS RECRUITER
            </Button>
            <Button
              component={Link}
              to="/login/recruiter"
              variant="outlined"
              size="medium"
              color="inherit"
              fullWidth
              sx={{ 
                mt: 2, 
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white'
                }
              }}
            >
              ALREADY HAVE AN ACCOUNT? LOG IN
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      <Typography 
        variant="h6" 
        color="text.secondary" 
        align="center" 
        sx={{ mt: 4 }}
      >
        Connect with top talent and opportunities in one place
      </Typography>
    </Container>
  );
};

export default Landing; 