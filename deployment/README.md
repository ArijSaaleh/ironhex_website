# 🚀 OVH VPS Deployment Guide for IronHex

This guide provides a complete, automated deployment setup for the IronHex website on an OVH VPS using GitHub Actions for CI/CD.

## 📋 Prerequisites

- OVH VPS with Ubuntu 20.04 or 22.04
- Domain name pointed to your VPS IP
- GitHub repository access
- SSH access to your VPS

## 🔧 Initial Setup (One-time)

### 1. Prepare Your VPS

SSH into your VPS:
```bash
ssh root@your-vps-ip
```

Create a deployment user (recommended):
```bash
adduser deploy
usermod -aG sudo deploy
su - deploy
```

### 2. Generate SSH Key for GitHub Actions

On your VPS:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy"
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/id_ed25519  # Copy this private key
```

### 3. Configure GitHub Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- `VPS_HOST`: Your VPS IP address (e.g., `123.45.67.89`)
- `VPS_USERNAME`: Your VPS username (e.g., `deploy`)
- `VPS_SSH_KEY`: The private SSH key from step 2
- `VPS_PORT`: SSH port (default: `22`)

### 4. Run Initial Setup Script

Copy the setup script to your VPS:
```bash
# On your local machine
scp -r deployment/ deploy@your-vps-ip:/home/deploy/

# On your VPS
cd /home/deploy/deployment
chmod +x *.sh
sudo ./setup-vps.sh
```

This script will:
- ✅ Install all required packages (Nginx, Python, Node.js)
- ✅ Clone your repository
- ✅ Set up Python virtual environment
- ✅ Install dependencies
- ✅ Configure systemd service for FastAPI
- ✅ Build frontend
- ✅ Configure Nginx
- ✅ Set up firewall

### 5. Configure Environment Variables

Edit the backend `.env` file:
```bash
sudo nano /var/www/ironhex/server/.env
```

Update these values:
```env
DATABASE_URL=sqlite:///./ironhex.db
SECRET_KEY=your-generated-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
SENDGRID_API_KEY=your_actual_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
CORS_ORIGINS=https://yourdomain.com
```

### 6. Update Domain Configuration

```bash
sudo nano /etc/nginx/sites-available/ironhex
```

Replace `yourdomain.com` with your actual domain.

Restart services:
```bash
sudo systemctl restart ironhex-api nginx
```

### 7. Setup SSL Certificate

```bash
cd /var/www/ironhex/deployment
sudo ./ssl-setup.sh
```

Follow the prompts to enter your domain and email.

## 🚀 Automated Deployment

Once setup is complete, deployment is automatic:

1. **Push to main branch**:
   ```bash
   git push origin main
   ```

2. **GitHub Actions automatically**:
   - Connects to your VPS via SSH
   - Pulls latest code
   - Updates backend dependencies
   - Restarts API service
   - Rebuilds frontend
   - Restarts Nginx

3. **Monitor deployment**:
   - Go to GitHub → Actions tab
   - View deployment logs in real-time

## 🔄 Manual Deployment

If needed, you can deploy manually:

```bash
ssh deploy@your-vps-ip
cd /var/www/ironhex
./deployment/deploy.sh
```

## 📊 Monitoring & Management

### Check Service Status
```bash
# On your VPS
cd /var/www/ironhex/deployment
./monitor.sh
```

### View Logs
```bash
# API logs
sudo journalctl -u ironhex-api -f

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart API
sudo systemctl restart ironhex-api

# Restart Nginx
sudo systemctl restart nginx

# Restart both
sudo systemctl restart ironhex-api nginx
```

## ⏮️ Rollback

To rollback to a previous version:

```bash
cd /var/www/ironhex
./deployment/rollback.sh <commit-hash>

# Or rollback to previous commit
./deployment/rollback.sh
```

## 🔒 Security Best Practices

1. **Change default SSH port**:
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Change Port 22 to custom port
   sudo systemctl restart sshd
   ```

2. **Enable automatic security updates**:
   ```bash
   sudo apt install unattended-upgrades
   sudo dpkg-reconfigure -plow unattended-upgrades
   ```

3. **Setup fail2ban**:
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

4. **Regular backups**:
   ```bash
   # Backup database
   cp /var/www/ironhex/server/ironhex.db ~/backups/ironhex-$(date +%Y%m%d).db
   ```

## 🛠️ Troubleshooting

### Deployment fails
1. Check GitHub Actions logs
2. SSH into VPS and check service logs
3. Verify all secrets are correctly set

### API not responding
```bash
sudo systemctl status ironhex-api
sudo journalctl -u ironhex-api -n 50
```

### Frontend not loading
```bash
sudo systemctl status nginx
sudo nginx -t
sudo tail -50 /var/log/nginx/error.log
```

### SSL issues
```bash
sudo certbot renew --dry-run
sudo certbot certificates
```

## 📈 Performance Optimization

### Enable Nginx caching
Already configured in the setup script for static assets.

### Database optimization
For production, consider migrating to PostgreSQL:
```bash
sudo apt install postgresql postgresql-contrib
# Update DATABASE_URL in .env
```

### Add CDN (Optional)
Consider using Cloudflare for:
- DDoS protection
- Global CDN
- Additional SSL/TLS security

## 📞 Support

If you encounter issues:
1. Check the logs using `./monitor.sh`
2. Review GitHub Actions deployment logs
3. Verify all configuration files
4. Check VPS resource usage (CPU, memory, disk)

## 🔄 Update Workflow

To modify the deployment workflow:
```bash
# Edit locally
nano .github/workflows/deploy.yml

# Commit and push
git add .github/workflows/deploy.yml
git commit -m "Update deployment workflow"
git push origin main
```

The changes will be applied automatically on the next deployment.
