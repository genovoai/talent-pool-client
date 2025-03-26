import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <ErrorOutlineIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        404: Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Return Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound; 