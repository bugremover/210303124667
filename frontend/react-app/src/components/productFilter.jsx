import React, { useState } from 'react';
import { 
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Slider,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    Box
} from '@mui/material';

function ProductFilter({ onFilterChange }) {
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000); // Adjust max as needed
    const [minRating, setMinRating] = useState(0);
    const [availableOnly, setAvailableOnly] = useState(false);

    const handleFilterChange = () => {
        onFilterChange({ category, company, minPrice, maxPrice, minRating, availableOnly });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    {}
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Laptop">Laptop</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel id="company-label">Company</InputLabel>
                <Select
                    labelId="company-label"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    {}
                    <MenuItem value="AMZ">AMZ</MenuItem>
                    <MenuItem value="FLP">FLP</MenuItem>
                </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>Price Range</Typography>
            <Slider
                value={[minPrice, maxPrice]}
                onChange={(e, newValue) => {
                    setMinPrice(newValue[0]);
                    setMaxPrice(newValue[1]);
                }}
                min={0}
                max={10000} 
                valueLabelDisplay="auto"
            />

            <Typography variant="h6" gutterBottom>Minimum Rating</Typography>
            <Slider
                value={minRating}
                onChange={(e, newValue) => setMinRating(newValue)}
                min={0}
                max={5}
                step={0.1}
                valueLabelDisplay="auto"
            />

            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} />}
                    label="Show Available Only"
                />
            </FormGroup>

            <Button variant="contained" onClick={handleFilterChange}>
                Apply Filters
            </Button>
        </Box>
    );
}

export default ProductFilter;
