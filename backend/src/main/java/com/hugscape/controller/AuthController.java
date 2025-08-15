package com.hugscape.controller;

import com.hugscape.entity.User;
import com.hugscape.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    // Test endpoint to verify OAuth2 configuration
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testOAuth() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "OAuth2 test endpoint working");
        response.put("status", "success");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
    
    // Google OAuth callback endpoint
    @GetMapping("/google/callback")
    public ResponseEntity<Map<String, Object>> googleCallback(@AuthenticationPrincipal OAuth2User oauth2User) {
        try {
            // Extract user information from Google OAuth
            String googleId = oauth2User.getName();
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");
            String givenName = oauth2User.getAttribute("given_name");
            String familyName = oauth2User.getAttribute("family_name");
            String picture = oauth2User.getAttribute("picture");
            String locale = oauth2User.getAttribute("locale");
            Boolean emailVerified = oauth2User.getAttribute("email_verified");
            
            // Find or create user
            User user = userService.findOrCreateUser(googleId, email, name, 
                                                   givenName, familyName, picture, locale, emailVerified);
            
            // Generate JWT token
            String token = userService.generateUserToken(user);
            
            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", createUserResponse(user));
            response.put("message", "Authentication successful");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Authentication failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Get current user profile
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = extractTokenFromHeader(authHeader);
            var userOpt = userService.getUserFromToken(token);
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                Map<String, Object> response = new HashMap<>();
                response.put("user", createUserResponse(user));
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid token");
                return ResponseEntity.status(401).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to get profile");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Update user profile
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> profileUpdate) {
        
        try {
            String token = extractTokenFromHeader(authHeader);
            var userOpt = userService.getUserFromToken(token);
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                String name = profileUpdate.get("name");
                String givenName = profileUpdate.get("givenName");
                String familyName = profileUpdate.get("familyName");
                
                User updatedUser = userService.updateUserProfile(user.getId(), name, givenName, familyName);
                
                Map<String, Object> response = new HashMap<>();
                response.put("user", createUserResponse(updatedUser));
                response.put("message", "Profile updated successfully");
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid token");
                return ResponseEntity.status(401).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to update profile");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Refresh JWT token
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = extractTokenFromHeader(authHeader);
            var userOpt = userService.getUserFromToken(token);
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                String newToken = userService.generateUserToken(user);
                
                Map<String, Object> response = new HashMap<>();
                response.put("token", newToken);
                response.put("user", createUserResponse(user));
                response.put("message", "Token refreshed successfully");
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid token");
                return ResponseEntity.status(401).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to refresh token");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Logout (client-side token removal)
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
    
    // Helper method to create user response
    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        userResponse.put("email", user.getEmail());
        userResponse.put("name", user.getName());
        userResponse.put("givenName", user.getGivenName());
        userResponse.put("familyName", user.getFamilyName());
        userResponse.put("picture", user.getPicture());
        userResponse.put("locale", user.getLocale());
        userResponse.put("emailVerified", user.getEmailVerified());
        userResponse.put("createdAt", user.getCreatedAt());
        userResponse.put("lastLogin", user.getLastLogin());
        return userResponse;
    }
    
    // Helper method to extract token from Authorization header
    private String extractTokenFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Invalid authorization header");
    }
}
