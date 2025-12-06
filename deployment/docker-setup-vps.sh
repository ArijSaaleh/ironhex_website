#!/bin/bash

# Docker-based OVH VPS Setup Script for IronHex Website
# This script sets up Docker and Docker Compose on your VPS

set -e

echo "🐳 Setting up IronHex with Docker on VPS..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "📦 Installing prerequisites..."
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    ufw

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
    
    # Add current user to docker group
    sudo usermod -aG docker $USER
    echo "⚠️  Please log out and log back in for Docker group membership to take effect"
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "✅ Docker Compose already installed"
fi

# Verify installations
echo "✅ Verifying installations..."
docker --version
docker-compose --version

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/ironhex
sudo chown -R $USER:$USER /var/www/ironhex

# Clone repository
echo "📥 Cloning repository..."
cd /var/www/ironhex
if [ ! -d ".git" ]; then
    git clone https://github.com/ArijSaaleh/ironhex_website.git .
else
    git pull origin main
fi

# Create .env file
echo "⚙️ Creating environment file..."
if [ ! -f ".env" ]; then
    cat > .env << EOF
# Backend
SECRET_KEY=$(openssl rand -hex 32)
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@ironhex.com
CORS_ORIGINS=https://yourdomain.com

# Frontend
VITE_API_URL=https://yourdomain.com
EOF
    echo "⚠️  Please edit /var/www/ironhex/.env with your actual credentials"
fi

# Create data directories
echo "📁 Creating data directories..."
mkdir -p server/data server/logs nginx/ssl

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create systemd service for auto-start
echo "⚙️ Creating systemd service..."
sudo tee /etc/systemd/system/ironhex-docker.service > /dev/null << EOF
[Unit]
Description=IronHex Docker Compose Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/ironhex
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable service
sudo systemctl daemon-reload
sudo systemctl enable ironhex-docker.service

echo ""
echo "✅ Docker setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit /var/www/ironhex/.env with your actual credentials"
echo "2. Log out and log back in (for Docker group membership)"
echo "3. Run: cd /var/www/ironhex && docker-compose up -d"
echo "4. Setup SSL with: ./deployment/docker-ssl-setup.sh"
echo "5. Configure GitHub Actions secrets for auto-deployment"
echo ""
echo "🔍 Useful commands:"
echo "  - Start: docker-compose up -d"
echo "  - Stop: docker-compose down"
echo "  - Logs: docker-compose logs -f"
echo "  - Rebuild: docker-compose up -d --build"
echo "  - Status: docker-compose ps"
