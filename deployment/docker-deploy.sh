#!/bin/bash

# Docker-based deployment script
# This script is used for manual deployments and by GitHub Actions

set -e

echo "🚀 Deploying IronHex with Docker..."

# Navigate to project directory
cd /var/www/ironhex

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Stop containers
echo "🛑 Stopping containers..."
docker-compose down

# Rebuild containers
echo "🔨 Building containers..."
docker-compose build --no-cache

# Start containers
echo "🚀 Starting containers..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 15

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running"
else
    echo "❌ Some services failed to start"
    docker-compose ps
    docker-compose logs --tail=50
    exit 1
fi

# Cleanup old images
echo "🧹 Cleaning up old images..."
docker image prune -f

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Service Status:"
docker-compose ps
echo ""
echo "🌐 Your website is live at:"
echo "   Frontend: http://jjj"
echo "   Backend:  http://jjj:8000/docs"
