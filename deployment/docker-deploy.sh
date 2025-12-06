#!/bin/bash

# Docker-based deployment script
# This script is used for manual deployments and by GitHub Actions

set -e

echo "🐳 Deploying IronHex with Docker..."

# Navigate to project directory
cd /var/www/ironhex

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Pull latest images (if using registry)
echo "📦 Pulling latest images..."
docker-compose pull 2>/dev/null || true

# Rebuild and restart containers
echo "🔨 Building and restarting containers..."
docker-compose up -d --build --remove-orphans

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

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
echo "🔍 View logs with: docker-compose logs -f"
