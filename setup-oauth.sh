#!/bin/bash

echo "🔐 Google OAuth2 Setup Script for Hugscape"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# Google OAuth2 Configuration
# Get these values from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Go to: https://console.cloud.google.com/"
echo "2. Create a new project or select existing one"
echo "3. Enable Google+ API or Google Identity"
echo "4. Create OAuth 2.0 credentials"
echo "5. Copy Client ID and Client Secret"
echo "6. Update the .env file with your values"
echo ""
echo "🔗 Quick Setup Guide:"
echo "   - Project name: hugscape-kids-shopping"
echo "   - Application type: Web application"
echo "   - Authorized origins: http://localhost:3000, http://localhost:5173"
echo "   - Redirect URIs: http://localhost:8080/api/oauth2/authorization/google"
echo ""
echo "💡 After updating .env, restart your backend:"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "🚀 Happy coding!"
