#!/bin/bash

# Simple SSL Setup with Let's Encrypt for Docker
# This script sets up SSL certificates and configures Nginx

set -e

DOMAIN="ironhex-tech.com"
EMAIL="arij.saleh@ironhex-tech.com"

echo "🔒 Setting up SSL for $DOMAIN..."

# Install Certbot
echo "📦 Installing Certbot..."
sudo apt update
sudo apt install -y certbot

# Stop nginx container temporarily
echo "⏸️ Stopping frontend container..."
cd /var/www/ironhex
docker-compose stop frontend

# Obtain certificate (standalone mode)
echo "🎫 Obtaining SSL certificate..."
sudo certbot certonly --standalone \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# Create nginx SSL configuration
echo "⚙️ Updating Nginx configuration..."
cat > /var/www/ironhex/client/nginx-ssl.conf << 'NGINXCONF'
server {
    listen 80;
    server_name ironhex-tech.com www.ironhex-tech.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ironhex-tech.com www.ironhex-tech.com;
    
    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/ironhex-tech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ironhex-tech.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # API proxy
    location /api/ {
        proxy_pass http://backend:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
        
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
    
    # Block access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    location ~ /\.env {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINXCONF

# Update docker-compose to mount SSL certificates
echo "📝 Updating docker-compose.yml..."
cat > /var/www/ironhex/docker-compose.yml << 'DOCKERCOMPOSE'
services:
  backend:
    build: ./server
    container_name: ironhex-api
    restart: always
    ports:
      - "8000:8000"
    env_file:
      - .env
    networks:
      - ironhex-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build: ./client
    container_name: ironhex-frontend
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - ./client/nginx-ssl.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - backend
    networks:
      - ironhex-network

networks:
  ironhex-network:
    driver: bridge
DOCKERCOMPOSE

# Rebuild and restart containers
echo "🔄 Rebuilding frontend container with SSL..."
docker-compose build frontend
docker-compose up -d

# Set up auto-renewal
echo "🔄 Setting up auto-renewal..."
sudo tee /etc/cron.d/certbot-renew > /dev/null << 'CRON'
0 3 * * * root certbot renew --quiet --deploy-hook "cd /var/www/ironhex && docker-compose restart frontend"
CRON

echo "✅ SSL setup complete!"
echo ""
echo "🌐 Your site is now available at:"
echo "   https://$DOMAIN"
echo "   https://www.$DOMAIN"
echo ""
echo "📋 Certificate will auto-renew every 60 days"
echo ""
echo "⚠️  Make sure your domain DNS is properly configured:"
echo "   A    @      $DOMAIN      51.91.8.230"
echo "   A    www    $DOMAIN      51.91.8.230"
