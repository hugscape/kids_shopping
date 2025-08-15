package com.hugscape.repository;

import com.hugscape.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find user by Google ID
    Optional<User> findByGoogleId(String googleId);
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Check if user exists by Google ID
    boolean existsByGoogleId(String googleId);
    
    // Check if user exists by email
    boolean existsByEmail(String email);
    
    // Find active users only
    Optional<User> findByGoogleIdAndIsActiveTrue(String googleId);
    
    Optional<User> findByEmailAndIsActiveTrue(String email);
}
