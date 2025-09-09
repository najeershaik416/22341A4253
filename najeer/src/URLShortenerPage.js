import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Grid
} from '@mui/material';

// The mockApiCall function and all core logic remain exactly the same.
const mockApiCall = async (originalUrl, validity, shortcode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const urlRegex = new RegExp(/^(http|https):\/\/[^ "]+$/);
      if (!urlRegex.test(originalUrl)) {
        reject(new Error('Invalid URL format. Must start with http:// or https://'));
        return;
      }
      const parsedValidity = parseInt(validity, 10);
      if (validity && (isNaN(parsedValidity) || parsedValidity <= 0)) {
        reject(new Error('Validity must be a positive integer in minutes.'));
        return;
      }

      const finalShortcode = shortcode || Math.random().toString(36).substring(2, 8);
      const shortenedUrl = `http://localhost:3000/${finalShortcode}`;
      const expiryDate = new Date(new Date().getTime() + (parsedValidity || 30) * 60000).toLocaleString();

      console.log('URL Shortening Request Logged:', {
        originalUrl: originalUrl,
        shortenedUrl: shortenedUrl,
        customShortcode: shortcode || 'N/A',
        validity: parsedValidity || 30,
        creationTime: new Date().toLocaleString(),
      });

      resolve({
        originalUrl: originalUrl,
        shortenedUrl: shortenedUrl,
        expiryDate: expiryDate,
        shortcode: finalShortcode,
        clicks: 0,
        detailedClicks: [],
      });
    }, 1200);
  });
};

function URLShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState('');
  const [shortenedData, setShortenedData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortenedData(null);
    setLoading(true);

    try {
      const data = await mockApiCall(originalUrl, validity, shortcode);
      setShortenedData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Panel: Form Input */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: '8px' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create a New Short URL
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your long URL and customize your short link settings below.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                required
                fullWidth
                label="Original URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                error={!!error}
                helperText={error}
              />
              <TextField
                fullWidth
                label="Preferred Shortcode (optional)"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
                inputProps={{ pattern: '^[a-zA-Z0-9]+$' }}
              />
              <TextField
                fullWidth
                label="Validity Period in Minutes (optional)"
                type="number"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, backgroundColor: '#4781B4' }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Shorten URL'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Right Panel: Shortened URL Output */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: '8px', minHeight: '300px' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Your Shortened URL
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The results of your URL shortening request will appear here.
            </Typography>
            {shortenedData && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">Original URL:</Typography>
                <Typography sx={{ mb: 1, wordBreak: 'break-word' }}>{shortenedData.originalUrl}</Typography>
                
                <Typography variant="subtitle1" fontWeight="bold">Shortened URL:</Typography>
                <Typography sx={{ mb: 1, wordBreak: 'break-word' }}>
                  <a href={shortenedData.shortenedUrl} style={{ color: '#4781B4' }}>{shortenedData.shortenedUrl}</a>
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="bold">Expires On:</Typography>
                <Typography>{shortenedData.expiryDate}</Typography>
              </Box>
            )}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default URLShortenerPage;