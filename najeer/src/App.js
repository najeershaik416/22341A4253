import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Link as LinkIcon, BarChart } from '@mui/icons-material';

import URLShortenerPage from './URLShortenerPage';
import URLStatisticsPage from './URLStatisticsPage';
import RedirectComponent from './RedirectComponent';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* Main Header */}
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1E2D3B' }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Affordmed URL Shortener
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* Sidebar Navigation */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#364B5C', color: 'white' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', pt: 2 }}>
            <List>
              <ListItem disablePadding component={Link} to="/">
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Shorten URL" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding component={Link} to="/stats">
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <BarChart />
                  </ListItemIcon>
                  <ListItemText primary="View Stats" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        
        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<URLShortenerPage />} />
            <Route path="/stats" element={<URLStatisticsPage />} />
            <Route path="/:shortcode" element={<RedirectComponent />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;