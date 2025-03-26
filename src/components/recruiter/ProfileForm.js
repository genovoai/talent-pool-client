import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box
} from '@mui/material';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    website: '',
    location: '',
    bio: '',
    linkedin: '',
    twitter: '',
    phone: ''
  });

  const {
    company,
    position,
    website,
    location,
    bio,
    linkedin,
    twitter,
    phone
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('Recruiter profile form submitted:', formData);
    // Here you would typically dispatch an action to update the recruiter profile
    alert('Profile updated successfully');
    navigate('/recruiter/dashboard');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Recruiter Profile
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Provide your information to help talent understand your company and role
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={company}
                onChange={onChange}
                required
                placeholder="e.g., Acme Corporation"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Position"
                name="position"
                value={position}
                onChange={onChange}
                required
                placeholder="e.g., Technical Recruiter"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Website"
                name="website"
                value={website}
                onChange={onChange}
                placeholder="e.g., https://acme.com"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={location}
                onChange={onChange}
                placeholder="e.g., San Francisco, CA"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Description"
                name="bio"
                value={bio}
                onChange={onChange}
                multiline
                rows={4}
                required
                placeholder="Describe your company, culture, and what kind of talent you're looking for"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
                placeholder="e.g., https://linkedin.com/company/acme"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Twitter"
                name="twitter"
                value={twitter}
                onChange={onChange}
                placeholder="e.g., @acmecorp"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
                placeholder="e.g., (123) 456-7890"
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/recruiter/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Save Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileForm; 