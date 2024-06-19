import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material'; 

function ProductCard({ product, onProductClick }) {
  const { productId, productName, price, rating, discount, availability, company, image } = product; 

  return (
    <Grid item xs={12} sm={6} md={4}>  {}
      <Card onClick={() => onProductClick(productId)}> 
        <CardMedia
          component="img"
          height="140"
          image={image } 
          alt={productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Company: {company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ₹{price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {rating}
          </Typography>
          {discount > 0 && (
            <Typography variant="body2" color="text.secondary">
              Discount: {discount}%
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Availability: {availability}
          </Typography>
          <Button size="small" color="primary">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductCard;
