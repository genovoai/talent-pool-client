import React, { useState, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import { ProfileContext } from '../../../context/ProfileContext';
import { AlertContext } from '../../../context/AlertContext';
import { countries } from '../../../utils/countries';
import LockIcon from '@mui/icons-material/Lock';

const PersonalProfilePanel = ({ profile, user }) => {
  const { createProfile } = useContext(ProfileContext);
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: profile?.title || '',
    location: profile?.location || '',
    sponsorshipRequired: profile?.sponsorshipRequired || 'no',
    sponsorshipComments: profile?.sponsorshipComments || ''
  });
  
  const { 
    title, 
    location, 
    sponsorshipRequired, 
    sponsorshipComments 
  } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting profile data:', formData);
      const success = await createProfile(formData);
      
      if (success) {
        setAlert('Personal information updated successfully', 'success');
      } else {
        setAlert('Failed to update personal information', 'error');
      }
    } catch (err) {
      setAlert('An error occurred', 'error');
    }
    
    setLoading(false);
  };
  
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>
      
      <Alert severity="info" icon={<LockIcon />} sx={{ mb: 3 }}>
        This information is for verification purposes only and will not be shared with recruiters.
      </Alert>
      
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={user?.firstName || ''}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={user?.lastName || ''}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                value={user?.email || ''}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Professional Title
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your current role or the position you're seeking
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Professional Title"
                name="title"
                value={title}
                onChange={onChange}
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Location & Work Requirements
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This helps us match you with appropriate opportunities
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Current Location</InputLabel>
                <Select
                  name="location"
                  value={location}
                  onChange={onChange}
                  label="Current Location"
                  required
                >
                  {countries.map(country => (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Do you require sponsorship?</FormLabel>
                <RadioGroup
                  row
                  name="sponsorshipRequired"
                  value={sponsorshipRequired}
                  onChange={onChange}
                >
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            {sponsorshipRequired === 'yes' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sponsorship Details"
                  name="sponsorshipComments"
                  value={sponsorshipComments}
                  onChange={onChange}
                  multiline
                  rows={2}
                  placeholder="Please provide details about your sponsorship needs"
                />
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default PersonalProfilePanel; 