# 🎯 Domain Setup & Docker Stability Guide

## ✅ What I Fixed

1. **Frontend Container Crashes** → Fixed health check (was looking for non-existent `/health` endpoint)
2. **Auto-restart enabled** → `restart: always` ensures containers restart if they crash
3. **Logging configured** → Limits log size to 10MB to prevent disk fill
4. **Domain support added** → Updated CORS for `ironhex-tech.com`

## 🌐 Point Your Domain to VPS

### In Squarespace (or your domain registrar):

1. Go to **Domain Settings** → **DNS**
2. Add/Update **A Record**:
   - **Host**: `@` (root) and `www`
   - **Value**: `51.91.8.230`
   - **TTL**: 3600 (or auto)

3. **Wait 24-48 hours** for DNS propagation (check with `nslookup ironhex-tech.com`)

### Result:
- `http://ironhex-tech.com` → Your website
- `http://www.ironhex-tech.com` → Your website

## 🚀 Deploy & Test

```bash
# On local machine
git add .
git commit -m "Fix frontend container stability and add domain support"
git push origin main

# On VPS
cd /var/www/ironhex
git pull origin main
docker-compose down
docker-compose up -d --build

# Watch for stability
docker-compose ps
sleep 60
docker-compose ps  # Should still show all containers UP
```

## ✅ Container Stability Checks

**Before**: Containers would crash and show "unhealthy"  
**After**: `restart: always` keeps them running

### Check status:
```bash
docker-compose ps
```

Expected output:
```
NAME                COMMAND             STATUS
ironhex-api        "uvicorn..."        Up 2 minutes (healthy)
ironhex-frontend   "nginx -g..."       Up 2 minutes (healthy)
```

### If container goes down:
```bash
# View logs
docker-compose logs -f frontend

# Restart
docker-compose restart frontend

# Force rebuild if issues persist
docker-compose down
docker-compose up -d --build
```

## 🔄 What Auto-Restart Does

- ✅ If backend crashes → automatically restarts
- ✅ If frontend crashes → automatically restarts
- ✅ If VPS reboots → containers auto-start
- ✅ No manual intervention needed!

## 🌍 Access Your Website

### While DNS is propagating:
```
http://51.91.8.230
http://51.91.8.230:8000/docs  (API docs)
```

### After DNS propagation (24-48h):
```
http://ironhex-tech.com
http://ironhex-tech.com:8000/docs
https://ironhex-tech.com (after SSL setup)
```

## 🔒 SSL Setup (Optional but Recommended)

Once domain is working on HTTP, enable HTTPS:

```bash
cd /var/www/ironhex
./deployment/docker-ssl-setup.sh
```

## 📊 Monitor Containers

Auto-check health every 15 minutes:

```bash
# View health status
docker-compose ps

# View real-time logs
docker-compose logs -f

# Backend logs only
docker-compose logs -f backend

# Frontend logs only
docker-compose logs -f frontend
```

## 🛠️ Troubleshooting

### Containers keep crashing
```bash
docker-compose logs -f
```

### Frontend shows 502 Bad Gateway
- Wait 15 seconds (startup time)
- Check backend is running: `docker-compose ps backend`

### Domain not resolving
```bash
nslookup ironhex-tech.com
# Should show your VPS IP: 51.91.8.230
```

### API not accessible
```bash
curl http://51.91.8.230:8000/api/health
# Should return: {"status":"ok",...}
```

## ✨ What Stays Running

- Containers auto-restart on crash
- Auto-restart on VPS reboot
- Logs are capped (won't fill disk)
- Health checks every 30 seconds

**Your website is now production-ready!** 🎉
