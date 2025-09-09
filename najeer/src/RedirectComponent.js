import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

// The data store for our mock shortcodes.
const mockUrlDatabase = {
  'amd123': 'https://www.affordmed.com',
  'g00gle': 'https://www.google.com',
};

function RedirectComponent() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const originalUrl = mockUrlDatabase[shortcode];
    
    // Log the redirection
    console.log(`Attempting to redirect from "${shortcode}". Original URL found: ${originalUrl || 'None'}.`);

    if (originalUrl) {
      // Perform the redirection
      window.location.replace(originalUrl); 
    } else {
      // Redirect to a specific page or show an error
      console.error(`Shortcode "${shortcode}" not found.`);
      navigate('/', { state: { error: `Shortcode "${shortcode}" not found.` } });
    }
  }, [shortcode, navigate]);

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h5">
        Redirecting...
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Please wait.
      </Typography>
    </Container>
  );
}

export default RedirectComponent;