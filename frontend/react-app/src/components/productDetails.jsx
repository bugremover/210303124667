import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CardMedia, Paper, Grid, Button } from '@mui/material';

function ProductDetails() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`YOUR_BACKEND_API_URL/products/${productId}`); 
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
     
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="300"
              image={product.image } 
              alt={product.productName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="body1">
              Company: {product.company}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Price: ₹{product.price}
            </Typography>
            {product.discount > 0 && (
              <Typography variant="body1">
                Discount: {product.discount}%
              </Typography>
            )}
            <Typography variant="body1">
              Rating: {product.rating}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Availability: {product.availability}
            </Typography>
            {}

            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductDetails;
