package com.hugscape.repository;

import com.hugscape.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find products by category
    List<Product> findByCategoryIgnoreCase(String category);
    
    // Find active products
    List<Product> findByIsActiveTrue();
    
    // Find products by category and active status
    List<Product> findByCategoryIgnoreCaseAndIsActiveTrue(String category);
    
    // Search products by name or description
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Product> searchProducts(@Param("searchTerm") String searchTerm);
    
    // Find products by price range
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);
    
    // Find products by size
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND :size MEMBER OF p.sizes")
    List<Product> findBySize(@Param("size") String size);
    
    // Find products by brand
    List<Product> findByBrandIgnoreCaseAndIsActiveTrue(String brand);
    
    // Find products with low stock (less than 10)
    @Query("SELECT p FROM Product p WHERE p.stockQuantity < 10 AND p.isActive = true")
    List<Product> findLowStockProducts();
}
