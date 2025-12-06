# 🐳 Docker Deployment Guide for IronHex

Complete guide for deploying IronHex website using Docker and Docker Compose on OVH VPS.

## 🎯 Why Docker?

✅ **Consistent environments** - Same behavior in dev and production  
✅ **Easy rollback** - Quick revert to previous versions  
✅ **Isolated dependencies** - No conflicts between services  
✅ **Scalable** - Easy to add more services  
✅ **Portable** - Deploy anywhere Docker runs  
✅ **Resource efficient** - Better resource utilization  

## 📋 Prerequisites

- OVH VPS with Ubuntu 20.04/22.04
- Domain name pointed to VPS IP
- SSH access to VPS
- GitHub repository access

## 🚀 Quick Start (5 Minutes)

### 1. Initial VPS Setup

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Run Docker setup script
curl -fsSL https://raw.githubusercontent.com/ArijSaaleh/ironhex_website/main/deployment/docker-setup-vps.sh | bash
```

### 2. Configure Environment

```bash
# Edit environment variables
nano /var/www/ironhex/.env
```

Update with your values:
```env
SECRET_KEY=your-generated-secret-key
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
CORS_ORIGINS=https://yourdomain.com
VITE_API_URL=https://yourdomain.com
```

### 3. Start Services

```bash
cd /var/www/ironhex
docker-compose up -d
```

### 4. Setup SSL (Production)

```bash
./deployment/docker-ssl-setup.sh
```

### 5. Configure Auto-Deployment

Add GitHub secrets (Settings → Secrets → Actions):
- `VPS_HOST`: Your VPS IP
- `VPS_USERNAME`: SSH username
- `VPS_SSH_KEY`: Private SSH key
- `VPS_PORT`: `22`

That's it! Push to `main` branch to auto-deploy.

## 🔧 Docker Commands

### Basic Operations

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Check service status
docker-compose ps

# Rebuild and restart
docker-compose up -d --build
```

### Maintenance

```bash
# Enter backend container
docker-compose exec backend bash

# Enter frontend container
docker-compose exec frontend sh

# View backend database
docker-compose exec backend ls -la /app/data

# Clean up unused images
docker image prune -f

# Clean up everything
docker system prune -a
```

### Database Management

```bash
# Backup database
docker cp ironhex-api:/app/data/ironhex.db ./backup.db

# Restore database
docker cp ./backup.db ironhex-api:/app/data/ironhex.db
docker-compose restart backend

# Access database directly
docker-compose exec backend python -c "from app.config.database import engine; print(engine)"
```

## 📊 Monitoring

### Health Checks

```bash
# Run health check script
./deployment/docker-monitor.sh

# Check container health
docker-compose ps

# View resource usage
docker stats

# Check logs for errors
docker-compose logs --tail=100 | grep -i error
```

### Performance Monitoring

```bash
# Container resource usage
docker stats ironhex-api ironhex-frontend

# Disk usage
docker system df

# Network usage
docker network ls
```

## 🔄 Deployment Workflows

### Manual Deployment

```bash
ssh deploy@your-vps-ip
cd /var/www/ironhex
./deployment/docker-deploy.sh
```

### Automated Deployment (GitHub Actions)

Set `DEPLOY_METHOD: docker` in `.github/workflows/deploy.yml`:

```yaml
env:
  DEPLOY_METHOD: docker
```

Push to main:
```bash
git push origin main
```

### Rolling Updates

```bash
# Zero-downtime update
docker-compose pull
docker-compose up -d --no-deps --build backend
docker-compose up -d --no-deps --build frontend
```

## 🔒 Security

### Best Practices

1. **Use secrets management**:
   ```bash
   # Never commit .env file
   echo ".env" >> .gitignore
   ```

2. **Run as non-root user** (already configured in Dockerfile)

3. **Limit container resources** (see `docker-compose.prod.yml`)

4. **Use SSL/TLS**:
   ```bash
   ./deployment/docker-ssl-setup.sh
   ```

5. **Keep images updated**:
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

## 🐛 Troubleshooting

### Services Won't Start

```bash
# Check logs
docker-compose logs

# Check specific service
docker-compose logs backend

# Check container status
docker-compose ps -a

# Restart from scratch
docker-compose down -v
docker-compose up -d --build
```

### Database Issues

```bash
# Check database file permissions
docker-compose exec backend ls -la /app/data

# Initialize database
docker-compose exec backend python init_admins.py

# Reset database
docker-compose down -v
docker-compose up -d
```

### Network Issues

```bash
# Check network
docker network inspect ironhex_ironhex-network

# Recreate network
docker-compose down
docker-compose up -d
```

### SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Copy to container
sudo cp /etc/letsencrypt/live/yourdomain.com/*.pem /var/www/ironhex/nginx/ssl/
docker-compose restart frontend
```

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Use with load balancer (Nginx, Traefik, etc.)
```

### Production Setup

Use production compose file:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Features:
- Resource limits
- Restart policies
- Log rotation
- Health checks

## 💾 Backup & Restore

### Automated Backups

```bash
# Setup automated backups
./deployment/docker-backup.sh

# Add to cron (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /var/www/ironhex/deployment/docker-backup.sh
```

### Manual Backup

```bash
# Backup everything
./deployment/docker-backup.sh

# Backup database only
docker cp ironhex-api:/app/data/ironhex.db ~/backup-$(date +%Y%m%d).db
```

### Restore from Backup

```bash
# Stop services
docker-compose down

# Restore database
cp ~/backup-20241206.db /var/www/ironhex/server/data/ironhex.db

# Restore environment
cp ~/env-backup .env

# Start services
docker-compose up -d
```

## 🔄 Migration from Systemd

Already using systemd deployment? Migrate to Docker:

```bash
# 1. Backup current setup
sudo systemctl stop ironhex-api nginx
cp /var/www/ironhex/server/ironhex.db ~/db-backup.db

# 2. Run Docker setup
./deployment/docker-setup-vps.sh

# 3. Copy database
cp ~/db-backup.db /var/www/ironhex/server/data/ironhex.db

# 4. Start Docker services
docker-compose up -d

# 5. Disable old services
sudo systemctl disable ironhex-api
```

## 📚 Advanced Configuration

### Custom Nginx Config

Edit `nginx/nginx.conf` and restart:
```bash
nano nginx/nginx.conf
docker-compose restart frontend
```

### Environment-Specific Configs

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Staging
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```

### Multi-Stage Builds

Dockerfiles use multi-stage builds for smaller images:
- Frontend: `node:20-alpine` → `nginx:alpine`
- Backend: Optimized Python image with minimal dependencies

## 🎓 Learning Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices for Dockerfiles](https://docs.docker.com/develop/dev-best-practices/)

## 🤝 Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Run monitor: `./deployment/docker-monitor.sh`
3. Check GitHub Issues

## 📝 Comparison: Docker vs Systemd

| Feature | Docker | Systemd |
|---------|--------|---------|
| Setup Time | ~5 minutes | ~15 minutes |
| Isolation | ✅ Full | ⚠️ Partial |
| Portability | ✅ High | ❌ Low |
| Resource Usage | ✅ Efficient | ✅ Efficient |
| Rollback | ✅ Easy | ⚠️ Manual |
| Scaling | ✅ Easy | ❌ Complex |
| Learning Curve | ⚠️ Medium | ✅ Low |

**Recommendation**: Use Docker for production deployments.
