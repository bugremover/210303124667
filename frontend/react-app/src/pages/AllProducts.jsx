import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container, CircularProgress } from '@mui/material';
import ProductCard from '../components/productCard';
import ProductFilter from '../components/productFilter';
import Pagination from '../components/Pagination';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    availableOnly: false,
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const productsPerPage = 10; // Adjust as needed

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get('YOUR_BACKEND_API_URL/api/categories/all/products', { // Updated endpoint for all products
          params: filters,
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    }
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    // Apply filters to products whenever filters change
    const newFilteredProducts = products.filter(product => {
      return (
        (filters.category === '' || product.category === filters.category) &&
        (filters.company === '' || product.company === filters.company) &&
        (product.price >= filters.minPrice && product.price <= filters.maxPrice) &&
        (product.rating >= filters.minRating) &&
        (!filters.availableOnly || product.availability === 'yes')
      );
    });
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // Reset page to 1 when filters change
  }, [products, filters]);

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container maxWidth="md">
      <ProductFilter onFilterChange={handleFilterChange} />

      {isLoading ? (
        <CircularProgress /> // Display loading indicator while fetching
      ) : (
        <Grid container spacing={3}>
          {currentProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} onProductClick={() => { /* handle click */ }} />
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default AllProducts;
