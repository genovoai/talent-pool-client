import React, { useContext, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../../context/AuthContext';
import { AlertContext } from '../../context/AlertContext';

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = ({ initialRole }) => {
  const { login, isAuthenticated, error, loading, user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const [submitError, setSubmitError] = useState('');
  const [selectedRole] = useState(initialRole || 'talent'); // Default to talent if no role specified
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated && user) {
    // Redirect based on user role
    return <Navigate to={user.role === 'talent' ? '/talent/profile' : '/recruiter/dashboard'} />;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError('');
    const { email, password } = values;
    
    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        setAlert('Login successful! Redirecting...', 'success');
        // Redirect based on selected role after successful login
        setTimeout(() => {
          navigate(selectedRole === 'talent' ? '/talent/profile' : '/recruiter/dashboard');
        }, 500);
      } else {
        setSubmitError(error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setSubmitError('An error occurred during login. Please try again.');
      console.error(err);
    }
    
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          mb: 4,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
          <Tooltip title="Back to Home">
            <IconButton 
              component={RouterLink} 
              to="/" 
              color="primary"
              size="small"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Typography component="h1" variant="h4" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
          {selectedRole === 'talent' ? 'Job Seeker Sign In' : 'Recruiter Sign In'}
        </Typography>
        
        {submitError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting || loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {(isSubmitting || loading) ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
              
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                  <Button
                    variant="text"
                    component={RouterLink}
                    to="/"
                  >
                    ← Back to Home
                  </Button>
                </Grid>
                <Grid item>
                  <Link 
                    component={RouterLink} 
                    to={selectedRole === 'talent' ? '/register/talent' : '/register/recruiter'} 
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login; 