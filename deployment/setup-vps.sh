#!/bin/bash

# OVH VPS Initial Setup Script for IronHex Website
# Run this script once on your VPS to set up the deployment environment

set -e

echo "🚀 Setting up IronHex deployment environment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "📦 Installing required packages..."
sudo apt install -y \
    nginx \
    python3.11 \
    python3.11-venv \
    python3-pip \
    git \
    curl \
    ufw \
    certbot \
    python3-certbot-nginx \
    nodejs \
    npm

# Install Node.js 20.x (LTS)
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/ironhex
sudo chown -R $USER:$USER /var/www/ironhex

# Clone repository
echo "📥 Cloning repository..."
cd /var/www/ironhex
git clone https://github.com/ArijSaaleh/ironhex_website.git .

# Setup Python virtual environment
echo "🐍 Setting up Python virtual environment..."
cd /var/www/ironhex/server
python3.11 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file for backend
echo "⚙️ Creating backend .env file..."
cat > /var/www/ironhex/server/.env << EOF
DATABASE_URL=sqlite:///./ironhex.db
SECRET_KEY=$(openssl rand -hex 32)
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@ironhex.com
CORS_ORIGINS=https://yourdomain.com
EOF

echo "⚠️  Please edit /var/www/ironhex/server/.env with your actual credentials"

# Initialize database
echo "💾 Initializing database..."
python init_admins.py

# Setup systemd service for FastAPI
echo "⚙️ Creating systemd service for FastAPI..."
sudo tee /etc/systemd/system/ironhex-api.service > /dev/null << EOF
[Unit]
Description=IronHex FastAPI Application
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/var/www/ironhex/server
Environment="PATH=/var/www/ironhex/server/venv/bin"
ExecStart=/var/www/ironhex/server/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Build frontend
echo "🎨 Building frontend..."
cd /var/www/ironhex/client
npm install
npm run build

# Setup Nginx configuration
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/ironhex > /dev/null << 'EOF'
# Rate limiting
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=general_limit:10m rate=30r/s;

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Frontend
    location / {
        root /var/www/ironhex/client/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api {
        limit_req zone=api_limit burst=20 nodelay;
        
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }
}
EOF

# Enable Nginx site
sudo ln -sf /etc/nginx/sites-available/ironhex /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Enable and start services
echo "🚀 Starting services..."
sudo systemctl daemon-reload
sudo systemctl enable ironhex-api
sudo systemctl start ironhex-api
sudo systemctl restart nginx

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit /var/www/ironhex/server/.env with your actual credentials"
echo "2. Update /etc/nginx/sites-available/ironhex with your domain name"
echo "3. Run: sudo systemctl restart ironhex-api nginx"
echo "4. Setup SSL with: sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "5. Add GitHub Actions secrets to your repository:"
echo "   - VPS_HOST: Your VPS IP address"
echo "   - VPS_USERNAME: Your VPS username"
echo "   - VPS_SSH_KEY: Your private SSH key"
echo "   - VPS_PORT: SSH port (default: 22)"
echo ""
echo "🔑 Backend .env location: /var/www/ironhex/server/.env"
echo "📊 Check API status: sudo systemctl status ironhex-api"
echo "🌐 Check Nginx status: sudo systemctl status nginx"
echo "📝 View API logs: sudo journalctl -u ironhex-api -f"
