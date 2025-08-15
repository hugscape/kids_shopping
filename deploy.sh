#!/bin/bash

echo "🚀 Building and deploying Hugscape Kids Shopping..."

# Navigate to frontend directory
cd frontend

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Build complete! Files are in frontend/dist/"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push your changes:"
echo "   git add ."
echo "   git commit -m 'Update website content'"
echo "   git push origin main"
echo ""
echo "2. GitHub Actions will automatically deploy to GitHub Pages"
echo "3. Your site will be available at: https://hugscape.co.in"
echo ""
echo "⏱️  Deployment usually takes 2-3 minutes after pushing"
