import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Chip,
  Tooltip,
  Avatar
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../context/AuthContext';
import { AlertContext } from '../../context/AlertContext';
import { ProfileContext } from '../../context/ProfileContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { clearProfile } = useContext(ProfileContext);

  const handleLogout = () => {
    clearProfile();
    logout();
    setAlert('You have been logged out successfully', 'success');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Tooltip title="Home">
            <IconButton
              component={Link}
              to="/"
              color="inherit"
              sx={{ mr: 1 }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1
            }}
          >
            Talent Pool
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Login status indicator */}
            {isAuthenticated && (
              <Tooltip title={`Logged in as ${user?.firstName || 'User'}`}>
                <Chip
                  avatar={<Avatar>{user?.firstName?.[0] || '?'}</Avatar>}
                  label={user?.role === 'talent' ? 'Talent' : 'Recruiter'}
                  color="secondary"
                  variant="outlined"
                  sx={{ mr: 2, borderColor: 'white', color: 'white' }}
                />
              </Tooltip>
            )}

            {/* Login/Register buttons for unauthenticated users */}
            {!isAuthenticated && (
              <>
                <Button
                  component={Link}
                  to="/login/talent"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  Login as Talent
                </Button>
                <Button
                  component={Link}
                  to="/login/recruiter"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  Login as Recruiter
                </Button>
                <Button
                  component={Link}
                  to="/register/talent"
                  color="inherit"
                  variant="outlined"
                  sx={{ borderColor: 'white' }}
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Logout button */}
            {isAuthenticated && (
              <Tooltip title="Sign Out">
                <IconButton 
                  color="inherit" 
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 