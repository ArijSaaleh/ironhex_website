#!/bin/bash

# SSL Certificate Setup Script using Let's Encrypt
# Run this after initial VPS setup

set -e

echo "🔒 Setting up SSL certificates..."

# Prompt for domain
read -p "Enter your domain name (e.g., ironhex.com): " DOMAIN
read -p "Enter your email for SSL notifications: " EMAIL

# Update Nginx configuration with actual domain
echo "📝 Updating Nginx configuration..."
sudo sed -i "s/yourdomain.com/$DOMAIN/g" /etc/nginx/sites-available/ironhex

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Obtain SSL certificate
echo "🔐 Obtaining SSL certificate from Let's Encrypt..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive --redirect

# Setup auto-renewal
echo "⏰ Setting up auto-renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo ""
echo "✅ SSL setup completed successfully!"
echo "🔒 Your website is now secured with HTTPS"
echo ""
echo "📋 Certificate details:"
sudo certbot certificates
echo ""
echo "🔄 Auto-renewal status:"
sudo systemctl status certbot.timer --no-pager
