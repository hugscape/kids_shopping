package com.hugscape.service;

import com.hugscape.entity.User;
import com.hugscape.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtService jwtService;
    
    // Find or create user from Google OAuth
    public User findOrCreateUser(String googleId, String email, String name, 
                                String givenName, String familyName, 
                                String picture, String locale, Boolean emailVerified) {
        
        Optional<User> existingUser = userRepository.findByGoogleId(googleId);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.updateLastLogin();
            return userRepository.save(user);
        }
        
        // Check if email already exists (in case of account linking)
        Optional<User> userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isPresent()) {
            // Link existing account to Google
            User user = userByEmail.get();
            user.setGoogleId(googleId);
            user.setGivenName(givenName);
            user.setFamilyName(familyName);
            user.setPicture(picture);
            user.setLocale(locale);
            user.setEmailVerified(emailVerified);
            user.updateLastLogin();
            return userRepository.save(user);
        }
        
        // Create new user
        User newUser = new User(googleId, email, name);
        newUser.setGivenName(givenName);
        newUser.setFamilyName(familyName);
        newUser.setPicture(picture);
        newUser.setLocale(locale);
        newUser.setEmailVerified(emailVerified);
        
        return userRepository.save(newUser);
    }
    
    // Find user by Google ID
    public Optional<User> findByGoogleId(String googleId) {
        return userRepository.findByGoogleIdAndIsActiveTrue(googleId);
    }
    
    // Find user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailAndIsActiveTrue(email);
    }
    
    // Find user by ID
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    // Update user profile
    public User updateUserProfile(Long userId, String name, String givenName, String familyName) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(name);
            user.setGivenName(givenName);
            user.setFamilyName(familyName);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found");
    }
    
    // Deactivate user account
    public boolean deactivateUser(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setIsActive(false);
            userRepository.save(user);
            return true;
        }
        return false;
    }
    
    // Generate JWT token for user
    public String generateUserToken(User user) {
        return jwtService.generateToken(user.getEmail(), user.getId());
    }
    
    // Validate JWT token and return user
    public Optional<User> getUserFromToken(String token) {
        if (jwtService.validateToken(token)) {
            Long userId = jwtService.extractUserId(token);
            return findById(userId);
        }
        return Optional.empty();
    }
    
    // Check if user exists
    public boolean userExists(String googleId) {
        return userRepository.existsByGoogleId(googleId);
    }
    
    // Check if email exists
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}
