import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  Paper,
} from '@mui/material';

const Home = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination) {
      alert("Please enter both source and destination.");
      return;
    }
    navigate(`/buses?source=${source}&destination=${destination}`);
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bus Booking System
          </Typography>
          <Box sx={{ display: 'flex', '& > *': { mx: 1.1} }}>
              <Button color="inherit"  component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
              <Button color="inherit" component={RouterLink} to="/mybookings">
                My Bookings
              </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Find Your Bus
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Source"
              variant="outlined"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Destination"
              variant="outlined"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Search Buses
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Home;
