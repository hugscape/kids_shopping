#!/bin/bash

echo "🚀 Setting up Hugscape Kids Shopping Website Development Environment"
echo "================================================================"

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Setup Backend
echo ""
echo "🔧 Setting up Backend (Spring Boot)..."
cd backend

echo "Building backend with Maven..."
if mvn clean install -q; then
    echo "✅ Backend built successfully!"
else
    echo "❌ Backend build failed!"
    exit 1
fi

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend (React)..."
cd frontend

echo "Installing frontend dependencies..."
if npm install --silent; then
    echo "✅ Frontend dependencies installed successfully!"
else
    echo "❌ Frontend dependency installation failed!"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend: cd backend && mvn spring-boot:run"
echo "2. Start the frontend: cd frontend && npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🔗 Useful URLs:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8080/api"
echo "- H2 Database Console: http://localhost:8080/h2-console"
echo ""
echo "Happy coding! 🚀"
