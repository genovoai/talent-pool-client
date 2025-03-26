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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
  Divider,
  IconButton,
  Tooltip,
  MenuItem,
  Select
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../../context/AuthContext';
import { AlertContext } from '../../context/AlertContext';
import { countries } from '../../utils/countries';

// Common validation schema for both roles
const commonValidation = {
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  country: Yup.string()
    .required('Country is required')
};

// Talent validation schema
const TalentSchema = Yup.object().shape({
  ...commonValidation,
  role: Yup.string().required().default('talent')
});

// Recruiter validation schema
const RecruiterSchema = Yup.object().shape({
  ...commonValidation,
  role: Yup.string().required().default('recruiter'),
  company: Yup.string().required('Company name is required'),
  position: Yup.string().required('Position is required')
});

const Register = ({ initialRole }) => {
  const { register, isAuthenticated, error, loading, user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const [submitError, setSubmitError] = useState('');
  const [selectedRole] = useState(initialRole || 'talent'); // Default to talent if not specified
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated && user) {
    return <Navigate to={user.role === 'talent' ? '/talent/profile' : '/recruiter/dashboard'} />;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitError('');
    
    // Remove confirmPassword from submitted data
    const { confirmPassword, ...formData } = values;
    
    // Ensure role is set
    if (!formData.role) {
      formData.role = selectedRole;
    }
    
    console.log('Submitting registration data:', { ...formData, password: '[HIDDEN]' });
    
    try {
      const success = await register(formData);
      if (success) {
        setAlert('Registration successful! Welcome aboard.', 'success');
        // Redirect to appropriate dashboard
        setTimeout(() => {
          navigate(formData.role === 'talent' ? '/talent/profile' : '/recruiter/dashboard');
        }, 500);
      } else {
        setSubmitError(error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setSubmitError('An error occurred during registration. Please try again.');
      console.error(err);
    }
    
    setSubmitting(false);
  };

  // Common form fields for both roles
  const CommonFields = ({ errors, touched }) => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="given-name"
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Field
          as={TextField}
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth error={touched.country && Boolean(errors.country)}>
          <Field
            as={Select}
            name="country"
            displayEmpty
            inputProps={{ 'aria-label': 'Country' }}
          >
            <MenuItem value="" disabled>
              <em>Select your country</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Field>
          {touched.country && errors.country && (
            <FormHelperText>{errors.country}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );

  // Recruiter-specific fields
  const RecruiterFields = ({ errors, touched }) => (
    <>
      <Grid item xs={12}>
        <Divider sx={{ my: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Recruiter Details
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          fullWidth
          id="company"
          label="Company Name"
          name="company"
          error={touched.company && Boolean(errors.company)}
          helperText={touched.company && errors.company}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          as={TextField}
          fullWidth
          id="position"
          label="Your Position"
          name="position"
          error={touched.position && Boolean(errors.position)}
          helperText={touched.position && errors.position}
        />
      </Grid>
    </>
  );

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
          {selectedRole === 'talent' ? 'Create Job Seeker Account' : 'Create Recruiter Account'}
        </Typography>
        
        {submitError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: selectedRole,
            company: '',
            position: '',
            country: ''
          }}
          validationSchema={selectedRole === 'talent' ? TalentSchema : RecruiterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, values }) => (
            <Form style={{ width: '100%' }}>
              {/* Hidden field for role */}
              <input type="hidden" name="role" value={selectedRole} />
              
              <CommonFields errors={errors} touched={touched} />
              
              {selectedRole === 'recruiter' && (
                <Grid container spacing={2}>
                  <RecruiterFields errors={errors} touched={touched} />
                </Grid>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting || loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {(isSubmitting || loading) ? <CircularProgress size={24} /> : 'Sign Up'}
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
                    to={selectedRole === 'talent' ? '/login/talent' : '/login/recruiter'} 
                    variant="body2"
                  >
                    Already have an account? Sign in
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

export default Register; 