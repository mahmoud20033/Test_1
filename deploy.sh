#!/bin/bash

# Production Deployment Script
# This script helps you deploy to Heroku quickly

set -e  # Exit on error

echo "======================================"
echo "Deployment Helper Script"
echo "======================================"

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Install from: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not initialized"
    echo "Run: git init"
    exit 1
fi

echo ""
echo "Step 1: Building frontend..."
cd ../../course/FINAL/vite-project/front
npm run build
echo "✅ Frontend built successfully"

echo ""
echo "Step 2: Copying dist folder to backend..."
cp -r dist ../../Backend_old/2-\ Mongo\ DB\ +\ Express\ Js/Lec10/Test_1/
echo "✅ Dist folder copied"

echo ""
echo "Step 3: Checking Heroku login..."
heroku auth:whoami > /dev/null 2>&1 || heroku login
echo "✅ Heroku authenticated"

echo ""
echo "Step 4: Setting environment variables..."
echo "Enter your MongoDB Atlas connection string:"
read MONGODB_URI
heroku config:set MONGODB_URI="$MONGODB_URI"
heroku config:set NODE_ENV=production

echo ""
echo "Step 5: Deploying to Heroku..."
git add .
git commit -m "Production deployment: $(date +%Y-%m-%d\ %H:%M:%S)"
git push heroku main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your app is live at:"
heroku open

echo ""
echo "To view logs:"
echo "heroku logs --tail"
