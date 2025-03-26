import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Divider,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertContext } from '../../../context/AlertContext';
import { AuthContext } from '../../../context/AuthContext';

const AccountSettingsPanel = () => {
  const { setAlert } = useContext(AlertContext);
  const { user } = useContext(AuthContext);
  
  // Password change state
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    jobMatches: true,
    profileViews: true,
    messageAlerts: true,
    marketingEmails: false
  });
  
  const { currentPassword, newPassword, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked
    });
  };

  const onSubmitPasswordChange = async e => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setAlert('Passwords do not match', 'error');
      return;
    }
    
    if (newPassword.length < 6) {
      setAlert('Password must be at least 6 characters', 'error');
      return;
    }
    
    setLoading(true);
    
    // This would normally connect to an API endpoint
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success scenario
      setAlert('Password updated successfully', 'success');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setAlert('Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAlert('Notification preferences saved', 'success');
    } catch (error) {
      setAlert('Failed to save notification preferences', 'error');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // This would connect to an API endpoint for account deletion
      setAlert('Account deletion is not implemented in this demo', 'info');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>

      <Grid container spacing={4}>
        {/* Password Change Section */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LockIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h6">Security Settings</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <form onSubmit={onSubmitPasswordChange}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Current Password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={onChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChange}
                    required
                    helperText="Password must be at least 6 characters"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ mt: 1 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Change Password'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Notification Preferences */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Notification Preferences</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.jobMatches}
                        onChange={handleNotificationChange}
                        name="jobMatches"
                        color="primary"
                      />
                    }
                    label="Job Match Alerts"
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
                    Be notified when new jobs match your skills and preferences
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.profileViews}
                        onChange={handleNotificationChange}
                        name="profileViews"
                        color="primary"
                      />
                    }
                    label="Profile View Notifications"
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
                    Receive alerts when recruiters view your profile
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.messageAlerts}
                        onChange={handleNotificationChange}
                        name="messageAlerts"
                        color="primary"
                      />
                    }
                    label="Message Alerts"
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
                    Get notified of new messages from recruiters
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.marketingEmails}
                        onChange={handleNotificationChange}
                        name="marketingEmails"
                        color="primary"
                      />
                    }
                    label="Marketing Communications"
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
                    Receive updates about new features and promotions
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveNotifications}
                  >
                    Save Preferences
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Account Management */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Management
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Account Email: <strong>{user?.email}</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Account Type: <strong>{user?.role === 'talent' ? 'Job Seeker' : 'Recruiter'}</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Member Since: <strong>{user?.date ? new Date(user.date).toLocaleDateString() : 'N/A'}</strong>
                </Typography>
              </Box>
              
              <Alert severity="warning" sx={{ mb: 3 }}>
                Deleting your account will permanently remove all your data including your profile, saved jobs, and application history.
              </Alert>
              
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountSettingsPanel; 