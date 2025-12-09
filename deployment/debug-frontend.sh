#!/bin/bash

# Quick diagnostic script for frontend issues

echo "📊 Checking frontend container status..."
echo ""

echo "=== Container Status ==="
docker-compose ps frontend

echo ""
echo "=== Recent Frontend Logs (last 50 lines) ==="
docker-compose logs --tail=50 frontend

echo ""
echo "=== Check if Nginx is the issue ==="
docker-compose logs frontend 2>&1 | grep -i "error\|fail\|crash" || echo "No obvious errors in logs"

echo ""
echo "=== Test Nginx config inside container ==="
docker-compose exec frontend nginx -t 2>&1 || echo "Container not running long enough to test"

echo ""
echo "=== Check container exit code ==="
docker inspect ironhex-frontend --format='{{.State.ExitCode}}' 2>/dev/null || echo "Container info unavailable"

echo ""
echo "💡 Recommendations:"
echo "1. View logs above for the actual error"
echo "2. Common issues: missing files, wrong paths, Nginx config syntax"
echo "3. Try: docker-compose logs -f frontend (for live logs)"
