#!/bin/bash

# Docker monitoring and health check script

echo "🐳 IronHex Docker Health Check"
echo "================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running"
    exit 1
fi

# Navigate to project directory
cd /var/www/ironhex

# Check container status
echo "📦 Container Status:"
docker-compose ps
echo ""

# Check container health
echo "💚 Health Status:"
docker-compose ps | grep -E "Up|healthy|unhealthy" || echo "No containers running"
echo ""

# Check resource usage
echo "💻 Resource Usage:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
echo ""

# Check disk space
echo "💾 Disk Usage:"
df -h / | tail -1 | awk '{print $5 " used (" $3 " / " $2 ")"}'
echo ""

# Check Docker disk usage
echo "🐳 Docker Disk Usage:"
docker system df
echo ""

# Recent logs from backend
echo "📝 Backend Logs (last 10 lines):"
docker-compose logs --tail=10 backend
echo ""

# Recent logs from frontend
echo "🌐 Frontend Logs (last 10 lines):"
docker-compose logs --tail=10 frontend
echo ""

# Check for stopped containers
echo "⚠️  Stopped Containers:"
docker-compose ps -a | grep Exit || echo "None"
echo ""

# Check SSL certificate expiry (if exists)
if [ -f "/etc/letsencrypt/live/*/cert.pem" ]; then
    echo "🔒 SSL Certificate Expiry:"
    sudo certbot certificates 2>/dev/null | grep "Expiry Date" || echo "Unable to check"
else
    echo "⚠️  SSL not configured"
fi
