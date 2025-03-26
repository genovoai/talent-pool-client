import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  IconButton,
  Divider,
  Card,
  CardContent,
  Chip,
  Stack,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ProfileContext } from '../../../context/ProfileContext';
import { AlertContext } from '../../../context/AlertContext';

const TalentProfilePanel = ({ profile }) => {
  const { createProfile } = useContext(ProfileContext);
  const { setAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  
  // Editable sections state
  const [editing, setEditing] = useState({
    headline: false,
    summary: false,
    skills: false
  });
  
  const [formData, setFormData] = useState({
    headline: profile?.headline || '',
    summary: profile?.summary || '',
    skills: profile?.skills ? (Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills) : ''
  });
  
  const { headline, summary, skills } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleEdit = (section) => {
    setEditing({ ...editing, [section]: true });
  };
  
  const handleCancel = (section) => {
    // Reset to original data
    setFormData({
      ...formData,
      [section]: profile?.[section] || (section === 'skills' ? '' : '')
    });
    setEditing({ ...editing, [section]: false });
  };
  
  const handleSave = async (section) => {
    setLoading(true);
    
    let dataToSave = { ...formData };
    
    // Format skills from comma-separated to array
    if (section === 'skills') {
      dataToSave.skills = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    }
    
    try {
      const success = await createProfile(dataToSave);
      
      if (success) {
        setAlert(`${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully`, 'success');
        setEditing({ ...editing, [section]: false });
      } else {
        setAlert(`Failed to update ${section}`, 'error');
      }
    } catch (err) {
      setAlert('An error occurred', 'error');
    }
    
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Professional Profile
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VisibilityIcon sx={{ mr: 1 }} />
          <Typography>
            This is what recruiters will see when they view your profile. No personal information will be shared.
          </Typography>
        </Box>
      </Alert>
      
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          How Blind Matching Works
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="body1" paragraph>
          Our talent platform uses blind matching to remove unconscious bias from the recruitment process. Recruiters will only see your professional information (headline, summary, and skills) without access to personal details such as your name, age, gender, or nationality.
        </Typography>
        
        <Typography variant="body1">
          Make sure your professional profile highlights your expertise, experience, and unique skills to stand out to potential employers.
        </Typography>
      </Paper>
      
      {/* Professional Profile Content */}
      <Grid container spacing={3}>
        {/* Professional Headline */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Professional Headline
                </Typography>
                {!editing.headline ? (
                  <IconButton onClick={() => handleEdit('headline')} size="small" title="Edit headline">
                    <EditIcon />
                  </IconButton>
                ) : (
                  <Box>
                    <IconButton onClick={() => handleSave('headline')} disabled={loading} size="small" color="primary" title="Save changes">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel('headline')} size="small" color="error" title="Cancel editing">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              
              {editing.headline ? (
                <TextField
                  fullWidth
                  name="headline"
                  value={headline}
                  onChange={onChange}
                  multiline
                  rows={2}
                  placeholder="Your professional headline"
                  helperText="A concise statement that highlights your professional identity (max 100 characters)"
                />
              ) : (
                <Typography variant="body1">
                  {headline || 'No headline available. Add a professional headline to catch recruiters\' attention.'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Profile Summary */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Profile Summary
                </Typography>
                {!editing.summary ? (
                  <IconButton onClick={() => handleEdit('summary')} size="small" title="Edit summary">
                    <EditIcon />
                  </IconButton>
                ) : (
                  <Box>
                    <IconButton onClick={() => handleSave('summary')} disabled={loading} size="small" color="primary" title="Save changes">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel('summary')} size="small" color="error" title="Cancel editing">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              
              {editing.summary ? (
                <TextField
                  fullWidth
                  name="summary"
                  value={summary}
                  onChange={onChange}
                  multiline
                  rows={4}
                  placeholder="Your professional summary"
                  helperText="A brief overview of your professional experience, expertise, and career goals (250-300 words recommended)"
                />
              ) : (
                <Typography variant="body1">
                  {summary || 'No summary available. Add a professional summary to showcase your expertise and experience.'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Skills */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Skills
                </Typography>
                {!editing.skills ? (
                  <IconButton onClick={() => handleEdit('skills')} size="small" title="Edit skills">
                    <EditIcon />
                  </IconButton>
                ) : (
                  <Box>
                    <IconButton onClick={() => handleSave('skills')} disabled={loading} size="small" color="primary" title="Save changes">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel('skills')} size="small" color="error" title="Cancel editing">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              
              {editing.skills ? (
                <TextField
                  fullWidth
                  name="skills"
                  value={skills}
                  onChange={onChange}
                  multiline
                  rows={2}
                  placeholder="Your skills (comma-separated)"
                  helperText="Enter skills separated by commas (e.g., JavaScript, React, Python)"
                />
              ) : (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {skills ? 
                    skills.split(',').map((skill, index) => (
                      <Chip 
                        key={index} 
                        label={skill.trim()} 
                        sx={{ m: 0.5 }} 
                        color="primary" 
                        variant="outlined" 
                      />
                    )) : 
                    <Typography variant="body2" color="textSecondary">
                      No skills available. Add your key skills to help recruiters find you.
                    </Typography>
                  }
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TalentProfilePanel; 