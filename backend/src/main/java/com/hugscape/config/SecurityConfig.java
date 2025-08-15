package com.hugscape.config;

import com.hugscape.entity.User;
import com.hugscape.service.JwtService;
import com.hugscape.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/api/h2-console/**", "/h2-console/**").permitAll()
                .anyRequest().permitAll()
            )
            .oauth2Login(oauth2 -> oauth2
                .successHandler(googleSuccessHandler())
                .failureHandler(googleFailureHandler())
            );

        // Allow H2 console to work
        http.headers(headers -> headers.frameOptions().disable());

        return http.build();
    }

    private AuthenticationSuccessHandler googleSuccessHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                String googleId = oauth2User.getName();
                String email = oauth2User.getAttribute("email");
                String name = oauth2User.getAttribute("name");
                String givenName = oauth2User.getAttribute("given_name");
                String familyName = oauth2User.getAttribute("family_name");
                String picture = oauth2User.getAttribute("picture");
                String locale = oauth2User.getAttribute("locale");
                Boolean emailVerified = oauth2User.getAttribute("email_verified");

                // Find or create user
                User user = userService.findOrCreateUser(googleId, email, name, givenName, familyName, picture, locale, emailVerified);
                // Generate token
                String token = jwtService.generateToken(user.getEmail(), user.getId());

                // Build redirect URL to frontend callback
                String frontendUrl = "http://localhost:3000/auth/callback";
                Map<String, Object> userPayload = new HashMap<>();
                userPayload.put("id", user.getId());
                userPayload.put("email", user.getEmail());
                userPayload.put("name", user.getName());
                userPayload.put("givenName", user.getGivenName());
                userPayload.put("familyName", user.getFamilyName());
                userPayload.put("picture", user.getPicture());
                userPayload.put("locale", user.getLocale());

                String userJson = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(userPayload);
                String redirectUrl = frontendUrl
                        + "?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
                        + "&user=" + URLEncoder.encode(userJson, StandardCharsets.UTF_8);

                response.sendRedirect(redirectUrl);
            }
        };
    }

    private AuthenticationFailureHandler googleFailureHandler() {
        return new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, Exception exception) throws IOException, ServletException {
                String frontendUrl = "http://localhost:3000/auth/callback?error=" + URLEncoder.encode(exception.getMessage(), StandardCharsets.UTF_8);
                response.sendRedirect(frontendUrl);
            }
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
