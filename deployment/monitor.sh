#!/bin/bash

# Monitoring and health check script

echo "📊 IronHex Website Health Check"
echo "================================"
echo ""

# Check API status
echo "🐍 Backend API Status:"
if sudo systemctl is-active --quiet ironhex-api; then
    echo "✅ Running"
    curl -s http://localhost:8000/api/health || echo "⚠️  Health endpoint not responding"
else
    echo "❌ Stopped"
fi
echo ""

# Check Nginx status
echo "🌐 Nginx Status:"
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Running"
else
    echo "❌ Stopped"
fi
echo ""

# Check disk space
echo "💾 Disk Usage:"
df -h / | tail -1 | awk '{print $5 " used (" $3 " / " $2 ")"}'
echo ""

# Check memory usage
echo "🧠 Memory Usage:"
free -h | grep Mem | awk '{print $3 " used / " $2 " total (" int($3/$2 * 100) "%)"}'
echo ""

# Check recent API logs
echo "📝 Recent API Logs (last 10 lines):"
sudo journalctl -u ironhex-api -n 10 --no-pager
echo ""

# Check Nginx access logs
echo "🌐 Recent Nginx Access (last 5 lines):"
sudo tail -5 /var/log/nginx/access.log 2>/dev/null || echo "No access logs found"
echo ""

# Check SSL certificate expiry
echo "🔒 SSL Certificate Status:"
if [ -d "/etc/letsencrypt/live" ]; then
    sudo certbot certificates 2>/dev/null | grep "Expiry Date" || echo "No certificates found"
else
    echo "⚠️  SSL not configured"
fi
