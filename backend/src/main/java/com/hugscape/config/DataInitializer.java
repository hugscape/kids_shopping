package com.hugscape.config;

import com.hugscape.entity.Product;
import com.hugscape.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Only initialize if no products exist
        if (productRepository.count() == 0) {
            initializeSampleProducts();
        }
    }
    
    private void initializeSampleProducts() {
        List<Product> sampleProducts = Arrays.asList(
            // Nightwear Collection
            createProduct(
                "Cotton Nightwear Set - Moon & Stars",
                "Soft cotton nightwear featuring adorable moon and stars pattern. Perfect for peaceful bedtime adventures.",
                new BigDecimal("29.99"),
                "nightwear",
                Arrays.asList("2T", "3T", "4T", "5T"),
                Arrays.asList("Blue", "Pink", "Yellow"),
                Arrays.asList("nightwear1.jpg", "nightwear2.jpg"),
                50,
                "Hugscape",
                "100% Cotton",
                "Machine wash cold, tumble dry low"
            ),
            
            createProduct(
                "Ikkat Print Pajamas",
                "Traditional Ikkat pattern nightwear made from pure cotton. Comfortable and stylish for little ones.",
                new BigDecimal("34.99"),
                "nightwear",
                Arrays.asList("2T", "3T", "4T", "5T", "6T"),
                Arrays.asList("Red", "Green", "Purple"),
                Arrays.asList("ikat1.jpg", "ikat2.jpg"),
                35,
                "Hugscape",
                "100% Cotton",
                "Hand wash cold, air dry"
            ),
            
            // Boys Collection
            createProduct(
                "Boys Cotton T-Shirt - Dinosaur",
                "Fun dinosaur print t-shirt made from soft cotton. Perfect for active little boys.",
                new BigDecimal("19.99"),
                "boys",
                Arrays.asList("2T", "3T", "4T", "5T"),
                Arrays.asList("Blue", "Green", "Red"),
                Arrays.asList("dino1.jpg", "dino2.jpg"),
                40,
                "Hugscape",
                "100% Cotton",
                "Machine wash cold, tumble dry low"
            ),
            
            createProduct(
                "Boys Shorts - Adventure",
                "Comfortable cotton shorts with adventure-themed prints. Great for outdoor play.",
                new BigDecimal("24.99"),
                "boys",
                Arrays.asList("2T", "3T", "4T", "5T"),
                Arrays.asList("Khaki", "Navy", "Olive"),
                Arrays.asList("shorts1.jpg", "shorts2.jpg"),
                30,
                "Hugscape",
                "100% Cotton",
                "Machine wash cold, tumble dry low"
            ),
            
            // Girls Collection
            createProduct(
                "Girls Dress - Floral Garden",
                "Beautiful floral print dress perfect for special occasions. Made from soft, breathable cotton.",
                new BigDecimal("39.99"),
                "girls",
                Arrays.asList("2T", "3T", "4T", "5T", "6T"),
                Arrays.asList("Pink", "Lavender", "Yellow"),
                Arrays.asList("dress1.jpg", "dress2.jpg"),
                25,
                "Hugscape",
                "100% Cotton",
                "Hand wash cold, air dry"
            ),
            
            createProduct(
                "Girls Top - Butterfly",
                "Adorable butterfly print top with comfortable fit. Ideal for everyday wear.",
                new BigDecimal("22.99"),
                "girls",
                Arrays.asList("2T", "3T", "4T", "5T"),
                Arrays.asList("Pink", "Blue", "Purple"),
                Arrays.asList("top1.jpg", "top2.jpg"),
                45,
                "Hugscape",
                "100% Cotton",
                "Machine wash cold, tumble dry low"
            ),
            
            // New Arrivals
            createProduct(
                "Festive Collection - Diwali Special",
                "Special festive wear with traditional Indian designs. Perfect for celebrations.",
                new BigDecimal("49.99"),
                "new-arrivals",
                Arrays.asList("2T", "3T", "4T", "5T", "6T"),
                Arrays.asList("Gold", "Red", "Green"),
                Arrays.asList("festive1.jpg", "festive2.jpg"),
                20,
                "Hugscape",
                "Silk Blend",
                "Dry clean recommended"
            ),
            
            createProduct(
                "Summer Collection - Beach Ready",
                "Lightweight summer wear perfect for beach days and outdoor activities.",
                new BigDecimal("27.99"),
                "new-arrivals",
                Arrays.asList("2T", "3T", "4T", "5T"),
                Arrays.asList("White", "Blue", "Yellow"),
                Arrays.asList("summer1.jpg", "summer2.jpg"),
                30,
                "Hugscape",
                "100% Cotton",
                "Machine wash cold, air dry"
            )
        );
        
        productRepository.saveAll(sampleProducts);
        System.out.println("Sample products initialized successfully!");
    }
    
    private Product createProduct(String name, String description, BigDecimal price, String category,
                                List<String> sizes, List<String> colors, List<String> images,
                                Integer stockQuantity, String brand, String material, String careInstructions) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setSizes(sizes);
        product.setColors(colors);
        product.setImages(images);
        product.setStockQuantity(stockQuantity);
        product.setBrand(brand);
        product.setMaterial(material);
        product.setCareInstructions(careInstructions);
        product.setIsActive(true);
        return product;
    }
}
