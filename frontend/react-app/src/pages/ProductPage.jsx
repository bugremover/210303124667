import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  CardMedia, 
  Paper, 
  Grid, 
  Button, 
  Box,
  Divider,
  Breadcrumbs,
} from '@mui/material';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`YOUR_BACKEND_API_URL/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        // Handle error (e.g., show error message)
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <Container maxWidth="md">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
        <Link color="inherit" to="/">All Products</Link>
        <Typography color="text.primary">{product.productName}</Typography>
      </Breadcrumbs>
      
      <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              alt={product.productName}
              height="300"
              image={product.image || 'https://via.placeholder.com/300'} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Company: {product.company}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: ₹{product.price}
            </Typography>
            {product.discount > 0 && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Discount: {product.discount}%
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              Rating: {product.rating}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Availability: {product.availability}
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="primary" fullWidth>
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductPage;
