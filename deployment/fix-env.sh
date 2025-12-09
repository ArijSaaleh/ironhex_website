#!/bin/bash

# Quick fix for CORS_ORIGINS warning and health check

echo "🔧 Fixing Docker warnings and health checks..."

# Ensure .env exists on VPS
if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file..."
    cat > .env << 'EOF'
# Backend Environment Variables
SECRET_KEY=4e98ddbf8174d9e1347a514b81417560f8d9102935e2017995c940d41519c648
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DEBUG=False

# Database
DATABASE_URL=sqlite:///./data/ironhex.db

# Email Configuration
SENDGRID_API_KEY=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
SENDGRID_FROM_EMAIL=arij.saleh@ironhex-tech.com
SENDGRID_FROM_NAME=IRONHEX_SUPPORT
EMAIL_TO=contact@ironhex-tech.com
SUPPORT_EMAIL=support@ironhex-tech.com

# CORS Configuration
CORS_ORIGINS=http://51.91.8.230,http://51.91.8.230:80,http://51.91.8.230:8000,https://ironhex-tech.com,https://www.ironhex-tech.com
VITE_DEV_ORIGIN=http://51.91.8.230
FRONTEND_ORIGIN=http://51.91.8.230

# Frontend Environment Variables
VITE_API_URL=http://51.91.8.230:8000
EOF
fi

echo "✅ Environment file ready"
echo ""
echo "🔄 Restarting containers..."
docker-compose down
docker-compose up -d

sleep 10

echo ""
echo "📊 Container Status:"
docker-compose ps

echo ""
echo "✅ Done! Your website is running at:"
echo "   Frontend: http://51.91.8.230"
echo "   Backend:  http://51.91.8.230:8000"
echo "   API Docs: http://51.91.8.230:8000/docs"
