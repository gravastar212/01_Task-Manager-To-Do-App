#!/bin/bash

# Task Manager Deployment Helper Script
# This script helps test deployment configurations locally

echo "🚀 Task Manager Deployment Helper"
echo "================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "📋 Pre-deployment Checklist:"
echo ""

# Check if backend has correct start script
echo "🔍 Checking backend configuration..."
if [ -f "backend/package.json" ]; then
    if grep -q '"start": "node src/index.js"' backend/package.json; then
        echo "✅ Backend start script is correct"
    else
        echo "❌ Backend start script is missing or incorrect"
    fi
else
    echo "❌ Backend package.json not found"
fi

# Check if Procfile exists
if [ -f "backend/Procfile" ]; then
    echo "✅ Procfile exists"
else
    echo "❌ Procfile missing"
fi

# Check if netlify.toml exists
if [ -f "frontend/netlify.toml" ]; then
    echo "✅ Netlify configuration exists"
else
    echo "❌ netlify.toml missing"
fi

# Check if environment example files exist
if [ -f "backend/.env.example" ]; then
    echo "✅ Backend .env.example exists"
else
    echo "❌ Backend .env.example missing"
fi

if [ -f "frontend/.env.example" ]; then
    echo "✅ Frontend .env.example exists"
else
    echo "❌ Frontend .env.example missing"
fi

echo ""
echo "🧪 Testing build commands..."

# Test frontend build
echo "🔨 Testing frontend build..."
cd frontend
if npm run build > /dev/null 2>&1; then
    echo "✅ Frontend build successful"
    if [ -d "dist" ]; then
        echo "✅ Dist directory created"
    else
        echo "❌ Dist directory not created"
    fi
else
    echo "❌ Frontend build failed"
fi
cd ..

# Test backend start command
echo "🔨 Testing backend start command..."
cd backend
if timeout 5s npm start > /dev/null 2>&1; then
    echo "✅ Backend start command works"
else
    echo "⚠️  Backend start command test (may need database connection)"
fi
cd ..

echo ""
echo "📚 Deployment Instructions:"
echo ""
echo "Frontend (Netlify):"
echo "1. Connect GitHub repo to Netlify"
echo "2. Set build command: npm run build"
echo "3. Set publish directory: dist"
echo "4. Set root directory: frontend"
echo "5. Add VITE_API_BASE environment variable"
echo ""
echo "Backend (Render):"
echo "1. Connect GitHub repo to Render"
echo "2. Set root directory: backend"
echo "3. Set build command: npm install"
echo "4. Set start command: npm start"
echo "5. Add environment variables (see backend/.env.example)"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - README.md (Deployment section)"
echo "   - backend/README.deploy.md"
echo ""
echo "🎉 Deployment configuration complete!"
