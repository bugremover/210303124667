import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Alert } from '@mui/material';
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';
import axios from 'axios';

function App() {
  const [authData, setAuthData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const registerAndAuthenticate = async () => {
      try {
        // 1. Registration
        const registrationData = { };
        const registrationResponse = await axios.post('', registrationData);

        // 2. Authentication
        const authData = { };
        const authResponse = await axios.post('', authData);

        // Store the access token
        setAuthData(authResponse.data);
      } catch (err) {
        setError('Registration or authentication failed. Please try again.');
      }
    };

    registerAndAuthenticate();
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              My E-commerce App
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {error && <Alert severity="error">{error}</Alert>}
        <Routes>
          <Route 
            path="/" 
            element={<AllProducts authData={authData} onError={(err) => setError(err)} />} 
          />
          <Route 
            path="/products/:productId" 
            element={<ProductPage authData={authData} onError={(err) => setError(err)} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
