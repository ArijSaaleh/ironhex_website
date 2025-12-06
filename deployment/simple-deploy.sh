#!/bin/bash

# Simple deployment script for IronHex Docker setup
# Run this on your VPS after pushing code

set -e

echo "🚀 Deploying IronHex with Docker..."

# Navigate to project directory
cd /var/www/ironhex

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Stop and remove old containers
echo "🛑 Stopping old containers..."
docker-compose down

# Remove old images to force rebuild
echo "🧹 Cleaning old images..."
docker-compose build --no-cache

# Start new containers
echo "🚀 Starting new containers..."
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check status
echo ""
echo "📊 Container Status:"
docker-compose ps

# Show logs
echo ""
echo "📝 Recent Logs:"
docker-compose logs --tail=20

echo ""
echo "✅ Deployment completed!"
echo ""
echo "🌐 Frontend: http://51.91.8.230"
echo "🔧 Backend: http://51.91.8.230:8000"
echo ""
echo "📋 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Restart: docker-compose restart"
echo "  Stop: docker-compose down"
