import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// The mockStats data remains exactly the same.
const mockStats = [
  {
    originalUrl: 'https://www.affordmed.com',
    shortenedUrl: 'http://localhost:3000/amd123',
    creationDate: 'September 9, 2025, 10:00 AM',
    expiryDate: 'September 9, 2025, 10:30 AM',
    totalClicks: 15,
    detailedClicks: [
      { timestamp: '10:05 AM', source: 'Direct', location: 'Hyderabad' },
      { timestamp: '10:10 AM', source: 'Twitter', location: 'Bangalore' },
      { timestamp: '10:15 AM', source: 'Facebook', location: 'Chennai' },
    ],
  },
  {
    originalUrl: 'https://www.google.com',
    shortenedUrl: 'http://localhost:3000/g00gle',
    creationDate: 'September 8, 2025, 09:00 AM',
    expiryDate: 'September 8, 2025, 09:30 AM',
    totalClicks: 22,
    detailedClicks: [
      { timestamp: '09:05 AM', source: 'Search', location: 'Delhi' },
      { timestamp: '09:10 AM', source: 'Direct', location: 'Mumbai' },
    ],
  },
];

function URLStatisticsPage() {
  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
        URL Shortener Statistics
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        A detailed overview of all shortened URLs and their performance data.
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '8px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#4781B4' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Original URL</TableCell>
              <TableCell sx={{ color: 'white' }}>Shortened URL</TableCell>
              <TableCell sx={{ color: 'white' }}>Creation Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Expiry Date</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Total Clicks</TableCell>
              <TableCell sx={{ color: 'white' }}>Detailed Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockStats.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ wordBreak: 'break-word' }}>
                  {row.originalUrl}
                </TableCell>
                <TableCell sx={{ wordBreak: 'break-word' }}>
                  <a href={row.shortenedUrl} style={{ color: '#4781B4' }}>{row.shortenedUrl}</a>
                </TableCell>
                <TableCell>{row.creationDate}</TableCell>
                <TableCell>{row.expiryDate}</TableCell>
                <TableCell align="right">{row.totalClicks}</TableCell>
                <TableCell>
                  <ul>
                    {row.detailedClicks.map((click, i) => (
                      <li key={i}>
                        Time: {click.timestamp}, Source: {click.source}, Location: {click.location}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default URLStatisticsPage;