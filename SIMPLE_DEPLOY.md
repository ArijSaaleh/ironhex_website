# 🚀 Simple Docker Deployment Guide

## Current Status
- **Backend**: http://51.91.8.230:8000 ✅ Working
- **Frontend**: http://51.91.8.230 ⚠️ Needs fix

## 📋 Quick Fix Steps

### On Your VPS (via SSH):

```bash
cd /var/www/ironhex

# Pull latest changes
git pull origin main

# Rebuild containers completely
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

## 🔍 What Was Wrong

1. **Missing root `.env` file** - Docker Compose needs `.env` at project root
2. **HTTPS redirect in browser** - Browser cached HTTPS redirect, causing port 443 errors
3. **CSP errors in meta tags** - Security headers should be in HTTP response, not HTML

## ✅ What's Fixed

1. Created `.env` at project root with correct values
2. Removed port 443 from docker-compose (only HTTP for now)
3. Set correct VITE_API_URL for your IP: `http://51.91.8.230:8000`
4. Added CORS_ORIGINS for your IP

## 🎯 After Deployment

### Test Backend:
```bash
curl http://51.91.8.230:8000/api/health
```

### Test Frontend:
Open in browser (use incognito/private mode to avoid cache):
```
http://51.91.8.230
```

### Clear Browser Cache:
If you still see errors:
1. Open browser DevTools (F12)
2. Right-click refresh button → "Empty Cache and Hard Reload"
3. Or use Incognito/Private mode

## 🐛 Troubleshooting

### Frontend shows ERR_CONNECTION_REFUSED:
```bash
# Check if frontend container is running
docker ps

# Check frontend logs
docker-compose logs frontend

# Restart frontend
docker-compose restart frontend
```

### Backend not accessible:
```bash
# Check backend logs
docker-compose logs backend

# Check if port 8000 is exposed
sudo netstat -tulpn | grep 8000
```

### CSP/Security Headers Errors:
These are now fixed in the code. After rebuild, they should disappear.

## 📝 File Structure

```
/var/www/ironhex/
├── .env                    # ← Docker Compose environment (NEW)
├── docker-compose.yml      # ← Fixed ports
├── server/
│   ├── .env               # ← Backend-specific config
│   └── Dockerfile
└── client/
    ├── Dockerfile
    └── nginx.conf         # ← Security headers removed from meta tags
```

## 🔒 For SSL Setup Later

Once everything works on HTTP, run:
```bash
./deployment/docker-ssl-setup.sh
```

This will:
- Install Nginx on host as reverse proxy
- Get Let's Encrypt SSL certificate
- Enable HTTPS access

## 💡 Tips

1. **Always use HTTP for now** - Don't access via HTTPS until SSL is set up
2. **Use incognito mode** - Avoid browser cache issues
3. **Check Docker logs** - `docker-compose logs -f` shows real-time logs
4. **Rebuild when needed** - `docker-compose build --no-cache` for clean rebuild

## 🆘 Still Not Working?

Run this diagnostic:
```bash
cd /var/www/ironhex

echo "=== Container Status ==="
docker-compose ps

echo -e "\n=== Backend Health ==="
curl -v http://localhost:8000/api/health

echo -e "\n=== Frontend Access ==="
curl -I http://localhost:80

echo -e "\n=== Recent Logs ==="
docker-compose logs --tail=50
```

Share the output for further help.
