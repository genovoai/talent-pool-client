import React, { useContext } from 'react';
import { AlertContext } from '../../context/AlertContext';
import { Alert as MuiAlert, Snackbar, Stack } from '@mui/material';

const Alert = () => {
  const { alerts, removeAlert } = useContext(AlertContext);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{ width: '100%', position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={() => removeAlert(alert.id)}
          autoHideDuration={6000}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => removeAlert(alert.id)}
            severity={alert.severity}
            sx={{ width: '100%' }}
          >
            {alert.msg}
          </MuiAlert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default Alert; 