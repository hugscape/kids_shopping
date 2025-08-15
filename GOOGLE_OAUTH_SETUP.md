# Google OAuth2 Setup Guide for Hugscape

This guide will help you set up Google OAuth2 authentication for your Hugscape kids shopping website.

## 🚀 Prerequisites

- Google account
- Access to Google Cloud Console
- Spring Boot application running
- React frontend running

## 📋 Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `hugscape-kids-shopping`
4. Click "Create"

### 2. Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and click "Enable"

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - User Type: External
   - App name: Hugscape Kids Shopping
   - User support email: your-email@domain.com
   - Developer contact information: your-email@domain.com
   - Save and continue

4. Back to creating OAuth client ID:
   - Application type: Web application
   - Name: Hugscape Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost:5173`
     - Your production domain (when ready)
   - Authorized redirect URIs:
     - `http://localhost:8080/api/oauth2/authorization/google`
     - Your production redirect URI (when ready)
   - Click "Create"

5. **Save your Client ID and Client Secret!**

### 4. Update Backend Configuration

1. Open `backend/src/main/resources/application.properties`
2. Replace the placeholder values:

```properties
# OAuth2 Configuration
spring.security.oauth2.client.registration.google.client-id=YOUR_ACTUAL_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_ACTUAL_CLIENT_SECRET
spring.security.oauth2.client.registration.google.scope=openid,profile,email
spring.security.oauth2.client.registration.google.redirect-uri={baseUrl}/oauth2/authorization/{registrationId}
```

### 5. Update Frontend Configuration

1. Open `frontend/src/contexts/AuthContext.jsx`
2. Verify the OAuth redirect URL matches your backend:

```javascript
const signInWithGoogle = () => {
  // This should match your Spring Boot OAuth2 endpoint
  window.location.href = '/api/oauth2/authorization/google';
};
```

### 6. Test the Setup

1. **Start Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Authentication:**
   - Go to http://localhost:3000
   - Click "Sign in with Google"
   - Complete Google OAuth flow
   - You should be redirected back with a JWT token

## 🔧 Troubleshooting

### Common Issues:

#### 1. "Invalid redirect_uri" Error
- Ensure the redirect URI in Google Console exactly matches your backend endpoint
- Check for trailing slashes or protocol mismatches

#### 2. CORS Errors
- Verify CORS configuration in `SecurityConfig.java`
- Check that your frontend origin is in the allowed origins list

#### 3. OAuth2 Configuration Not Found
- Ensure you've enabled the Google+ API
- Verify your credentials are in the correct project

#### 4. JWT Token Issues
- Check JWT secret in `application.properties`
- Verify JWT expiration time

### Debug Steps:

1. **Check Backend Logs:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Look for OAuth2 and security-related log messages.

2. **Check Frontend Console:**
   Open browser DevTools and check for JavaScript errors.

3. **Verify Network Requests:**
   Check Network tab in DevTools for failed requests.

## 🚀 Production Deployment

### 1. Update Google Console
- Add your production domain to authorized origins
- Add production redirect URI
- Update OAuth consent screen with production information

### 2. Environment Variables
- Use environment variables for client ID and secret
- Never commit credentials to version control

### 3. HTTPS Required
- Google OAuth2 requires HTTPS in production
- Ensure your production domain has SSL certificate

## 📱 Mobile Considerations

### React Native (Future)
- Use `@react-native-google-signin/google-signin`
- Configure Android and iOS specific settings
- Handle mobile-specific OAuth flows

### Progressive Web App
- Current setup works for PWA
- Consider offline authentication strategies

## 🔒 Security Best Practices

1. **Never expose client secret** in frontend code
2. **Use environment variables** for sensitive data
3. **Implement proper JWT validation** on all protected endpoints
4. **Add rate limiting** to prevent abuse
5. **Log authentication events** for security monitoring
6. **Implement token refresh** logic
7. **Add logout functionality** that invalidates tokens

## 📊 Testing Authentication

### Manual Testing:
1. Sign in with Google
2. Verify JWT token is stored
3. Test protected endpoints
4. Test logout functionality
5. Test token refresh

### Automated Testing:
```bash
# Backend tests
cd backend
mvn test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 🎯 Next Steps

After successful OAuth2 setup:

1. **User Profile Management**
   - Profile update functionality
   - Avatar management
   - Preferences storage

2. **Role-Based Access Control**
   - Admin vs regular user roles
   - Permission management

3. **Social Features**
   - Wishlist sharing
   - Product reviews
   - Social login options

4. **Security Enhancements**
   - Two-factor authentication
   - Account linking
   - Security audit logs

## 📞 Support

If you encounter issues:

1. Check Google Cloud Console logs
2. Review Spring Boot security logs
3. Check browser console for errors
4. Verify all configuration values
5. Test with a simple OAuth2 flow first

## 🔗 Useful Resources

- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Spring Security OAuth2](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html)
- [React OAuth2 Integration](https://react-oauth.github.io/)

---

**Happy coding! 🚀✨**
