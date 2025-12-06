#!/bin/bash

# Quick deployment script for manual deployments
# This script is also used by GitHub Actions

set -e

echo "🚀 Deploying IronHex Website..."

# Navigate to project directory
cd /var/www/ironhex

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Deploy Backend
echo "🐍 Deploying backend..."
cd server
source venv/bin/activate
pip install -r requirements.txt --quiet
sudo systemctl restart ironhex-api

# Wait for API to start
echo "⏳ Waiting for API to start..."
sleep 3

# Check if API is running
if sudo systemctl is-active --quiet ironhex-api; then
    echo "✅ Backend deployed successfully"
else
    echo "❌ Backend deployment failed"
    sudo journalctl -u ironhex-api -n 50
    exit 1
fi

# Deploy Frontend
echo "🎨 Deploying frontend..."
cd ../client
npm install --silent
npm run build

# Restart Nginx
sudo systemctl restart nginx

# Check if Nginx is running
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Frontend deployed successfully"
else
    echo "❌ Frontend deployment failed"
    sudo nginx -t
    exit 1
fi

echo ""
echo "✅ Deployment completed successfully!"
echo "🌐 Your website is now live!"
echo ""
echo "📊 Service Status:"
sudo systemctl status ironhex-api --no-pager -l
echo ""
sudo systemctl status nginx --no-pager -l
