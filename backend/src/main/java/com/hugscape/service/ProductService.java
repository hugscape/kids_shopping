package com.hugscape.service;

import com.hugscape.entity.Product;
import com.hugscape.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    // Get all active products
    public List<Product> getAllActiveProducts() {
        return productRepository.findByIsActiveTrue();
    }
    
    // Get product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    // Get products by category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCaseAndIsActiveTrue(category);
    }
    
    // Search products
    public List<Product> searchProducts(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllActiveProducts();
        }
        return productRepository.searchProducts(searchTerm.trim());
    }
    
    // Get products by price range
    public List<Product> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceRange(minPrice, maxPrice);
    }
    
    // Get products by size
    public List<Product> getProductsBySize(String size) {
        return productRepository.findBySize(size);
    }
    
    // Get products by brand
    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrandIgnoreCaseAndIsActiveTrue(brand);
    }
    
    // Create new product
    public Product createProduct(Product product) {
        product.setIsActive(true);
        return productRepository.save(product);
    }
    
    // Update product
    public Optional<Product> updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setCategory(productDetails.getCategory());
            product.setSizes(productDetails.getSizes());
            product.setColors(productDetails.getColors());
            product.setImages(productDetails.getImages());
            product.setStockQuantity(productDetails.getStockQuantity());
            product.setBrand(productDetails.getBrand());
            product.setMaterial(productDetails.getMaterial());
            product.setCareInstructions(productDetails.getCareInstructions());
            return productRepository.save(product);
        });
    }
    
    // Delete product (soft delete)
    public boolean deleteProduct(Long id) {
        return productRepository.findById(id).map(product -> {
            product.setIsActive(false);
            productRepository.save(product);
            return true;
        }).orElse(false);
    }
    
    // Update stock quantity
    public boolean updateStock(Long productId, Integer newQuantity) {
        if (newQuantity < 0) {
            return false;
        }
        
        return productRepository.findById(productId).map(product -> {
            product.setStockQuantity(newQuantity);
            productRepository.save(product);
            return true;
        }).orElse(false);
    }
    
    // Get low stock products
    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }
    
    // Get all categories
    public List<String> getAllCategories() {
        return productRepository.findAll().stream()
                .map(Product::getCategory)
                .distinct()
                .toList();
    }
    
    // Get all brands
    public List<String> getAllBrands() {
        return productRepository.findAll().stream()
                .map(Product::getBrand)
                .filter(brand -> brand != null && !brand.trim().isEmpty())
                .distinct()
                .toList();
    }
}
