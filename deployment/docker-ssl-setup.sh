#!/bin/bash

# SSL Certificate Setup for Docker deployment
# Uses Nginx reverse proxy with Let's Encrypt

set -e

echo "🔒 Setting up SSL certificates for Docker deployment..."

# Prompt for domain
read -p "Enter your domain name (e.g., ironhex.com): " DOMAIN
read -p "Enter your email for SSL notifications: " EMAIL

# Navigate to project
cd /var/www/ironhex

# Ensure containers are running
echo "🚀 Starting containers..."
docker-compose up -d

# Install Certbot with Nginx plugin
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing Certbot..."
    sudo apt install -y certbot python3-certbot-nginx
fi

# Install Nginx on host for SSL termination
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt install -y nginx
fi

# Create Nginx configuration for SSL proxy
echo "⚙️ Creating Nginx reverse proxy configuration..."
sudo tee /etc/nginx/sites-available/ironhex > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name _;
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Update docker-compose to use port 8080 instead of 80
echo "📝 Updating Docker ports..."
sed -i 's/"80:80"/"8080:80"/g' /var/www/ironhex/docker-compose.yml
sed -i 's/"443:443"/"8443:443"/g' /var/www/ironhex/docker-compose.yml

# Restart containers with new ports
echo "🔄 Restarting containers..."
docker-compose down
docker-compose up -d

# Enable the site
sudo ln -sf /etc/nginx/sites-available/ironhex /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 5

# Obtain SSL certificate
echo "🔐 Obtaining SSL certificate..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive --redirect

# Setup auto-renewal
echo "⏰ Setting up auto-renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo ""
echo "✅ SSL setup completed successfully!"
echo "🔒 Your website is now secured with HTTPS"
echo ""
echo "📋 Certificate location: /etc/letsencrypt/live/$DOMAIN/"
echo "🔄 Certbot auto-renewal is enabled"
echo ""
echo "🔍 Test your SSL: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo ""
echo "📝 Architecture:"
echo "  Internet → Nginx (Host, Port 80/443, SSL) → Docker Container (Port 8080)"