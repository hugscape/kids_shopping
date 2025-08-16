#!/bin/bash

# Exit on error
set -e

echo "🚀 Building and deploying Hugscape Kids Shopping..."

# Step 1: Build the frontend
cd frontend
npm install
echo "🔨 Building frontend..."
npm run build
cd ..

# Step 2: Remove all old built files from project root (except special files)
echo "🧹 Cleaning up old build files from project root..."
find . -maxdepth 1 -type f \( -name 'index.html' -o -name 'favicon*' -o -name 'apple-touch-icon*' -o -name 'manifest.json' -o -name 'robots.txt' -o -name 'assets' \) -exec rm -rf {} +
rm -rf ./assets

# Step 3: Copy ONLY the built index.html and assets from frontend/dist to project root
echo "📁 Copying new build files to project root..."
cp frontend/dist/index.html .
cp -R frontend/dist/assets .

# Step 4: Reminder to commit and push
echo "✅ Build files copied to project root!"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push your changes:"
echo "   git add ."
echo "   git commit -m 'Deploy production build to GitHub Pages (dist only)'"
echo "   git push origin main"
echo ""
echo "2. GitHub Actions will automatically deploy to GitHub Pages (if configured)"
echo "3. Your site will be available at: https://hugscape.co.in"
echo ""
echo "⏱️  Deployment usually takes 2-3 minutes after pushing"
