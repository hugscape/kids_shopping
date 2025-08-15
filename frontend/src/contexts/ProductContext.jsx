import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    size: '',
    searchTerm: ''
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/products/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/products/brands');
      setBrands(response.data);
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  };

  // Search products
  const searchProducts = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/search?q=${encodeURIComponent(searchTerm)}`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search products');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get products by category
  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/category/${encodeURIComponent(category)}`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products by category');
      console.error('Error fetching products by category:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get products by price range
  const getProductsByPriceRange = async (minPrice, maxPrice) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products by price range');
      console.error('Error fetching products by price range:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get products by size
  const getProductsBySize = async (size) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/size/${encodeURIComponent(size)}`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products by size');
      console.error('Error fetching products by size:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get products by brand
  const getProductsByBrand = async (brand) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/brand/${encodeURIComponent(brand)}`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products by brand');
      console.error('Error fetching products by brand:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const applyFilters = async () => {
    try {
      setLoading(true);
      let url = '/api/products';
      const params = new URLSearchParams();

      if (filters.category) {
        params.append('category', filters.category);
      }
      if (filters.brand) {
        params.append('brand', filters.brand);
      }
      if (filters.minPrice) {
        params.append('minPrice', filters.minPrice);
      }
      if (filters.maxPrice) {
        params.append('maxPrice', filters.maxPrice);
      }
      if (filters.size) {
        params.append('size', filters.size);
      }
      if (filters.searchTerm) {
        params.append('q', filters.searchTerm);
      }

      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await axios.get(url);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to apply filters');
      console.error('Error applying filters:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      searchTerm: ''
    });
    fetchProducts();
  };

  // Get product by ID
  const getProductById = async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (Object.values(filters).some(value => value !== '')) {
      applyFilters();
    }
  }, [filters]);

  const value = {
    products,
    loading,
    error,
    categories,
    brands,
    filters,
    fetchProducts,
    searchProducts,
    getProductsByCategory,
    getProductsByPriceRange,
    getProductsBySize,
    getProductsByBrand,
    updateFilters,
    clearFilters,
    getProductById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
