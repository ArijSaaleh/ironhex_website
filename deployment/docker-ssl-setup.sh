#!/bin/bash

# SSL Certificate Setup for Docker deployment
# Uses Certbot with standalone mode

set -e

echo "🔒 Setting up SSL certificates for Docker deployment..."

# Prompt for domain
read -p "Enter your domain name (e.g., ironhex.com): " DOMAIN
read -p "Enter your email for SSL notifications: " EMAIL

# Stop containers temporarily
echo "⏸️  Stopping containers..."
cd /var/www/ironhex
docker-compose down

# Install Certbot if not present
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing Certbot..."
    sudo apt install -y certbot
fi

# Obtain certificate
echo "🔐 Obtaining SSL certificate..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --non-interactive \
    --preferred-challenges http

# Copy certificates to nginx ssl directory
echo "📋 Copying certificates..."
sudo mkdir -p /var/www/ironhex/nginx/ssl
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /var/www/ironhex/nginx/ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /var/www/ironhex/nginx/ssl/
sudo chown -R $USER:$USER /var/www/ironhex/nginx/ssl

# Update nginx configuration for SSL
echo "⚙️ Updating Nginx configuration..."
cat > /var/www/ironhex/nginx/nginx.conf << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Static files with caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # API proxy
    location /api {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
EOF

# Update docker-compose to mount nginx config
echo "📝 Updating docker-compose.yml..."
sed -i 's|./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro|./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro|g' /var/www/ironhex/docker-compose.yml

# Setup auto-renewal with cron
echo "⏰ Setting up auto-renewal..."
(crontab -l 2>/dev/null | grep -v certbot; echo "0 0 1 * * sudo certbot renew --quiet && sudo cp /etc/letsencrypt/live/$DOMAIN/*.pem /var/www/ironhex/nginx/ssl/ && cd /var/www/ironhex && docker-compose restart frontend") | crontab -

# Start containers
echo "🚀 Starting containers with SSL..."
docker-compose up -d

echo ""
echo "✅ SSL setup completed successfully!"
echo "🔒 Your website is now secured with HTTPS"
echo ""
echo "📋 Certificate location: /etc/letsencrypt/live/$DOMAIN/"
echo "🔄 Auto-renewal configured for the 1st of each month"
echo ""
echo "🔍 Test your SSL: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
