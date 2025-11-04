# 🚂 Railway Deployment Guide

## Quick Deploy to Railway

### 1. Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub repository with your code

### 2. Deploy Steps

#### Option A: Deploy from GitHub (Recommended)
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect the Python app
6. Click "Deploy"

#### Option B: Deploy with Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### 3. Environment Variables

Add these in Railway Dashboard → Variables:

**Required:**
```env
SECRET_KEY=your-super-secret-key-change-this-in-production-make-it-long-and-random
PORT=8000
```

**Optional (SendGrid for emails):**
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@ironhex-tech.com
SENDGRID_FROM_NAME=IRONHEX
EMAIL_TO=contact@ironhex-tech.com
```

**Optional (CORS):**
```env
VITE_DEV_ORIGIN=https://your-frontend-domain.com
```

**Optional:**
```env
DEBUG=False
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### 4. Database

Railway will use **SQLite** (file-based database):
- Database file: `messages.db` (auto-created)
- Persistent across deployments
- Perfect for small to medium traffic

**⚠️ Note:** SQLite data is stored in Railway's volume. For production with high traffic, consider upgrading to PostgreSQL.

### 5. Super Admins

**Automatically created on first deployment!**

Default credentials:
- **Username:** `arij` | **Password:** `Admin2025!`
- **Username:** `imen` | **Password:** `Admin2025!`

⚠️ **IMPORTANT:** Change these passwords immediately after first login!

### 6. Post-Deployment

1. **Get your Railway URL:**
   - Found in Railway Dashboard → Settings → Domains
   - Example: `https://your-app.railway.app`

2. **Test the API:**
   - Visit: `https://your-app.railway.app`
   - API Docs: `https://your-app.railway.app/docs`
   - Health: `https://your-app.railway.app/api/health`

3. **Login to backoffice:**
   - Use credentials: `arij` / `IronHex2025!` or `imen` / `IronHex2025!`
   - **Change password immediately!**

4. **Update frontend:**
   - Update your frontend API URL to Railway URL
   - Example: `const API_URL = "https://your-app.railway.app"`

### 7. Custom Domain (Optional)

1. Go to Railway Dashboard → Settings → Domains
2. Click "Add Custom Domain"
3. Enter your domain: `api.ironhex-tech.com`
4. Add CNAME record in your DNS:
   ```
   CNAME: api → your-app.railway.app
   ```
5. Wait for SSL certificate (automatic)

### 8. Monitoring

Railway provides:
- **Logs:** Dashboard → Deployments → View Logs
- **Metrics:** Dashboard → Metrics
- **Alerts:** Configure in Settings

### 9. Troubleshooting

**App not starting?**
- Check logs in Railway Dashboard
- Verify environment variables are set
- Ensure `PORT` variable is set

**Database errors?**
- SQLite creates `messages.db` automatically
- Check file permissions in logs

**Super admins not created?**
- Check deployment logs for "✅ Created super admin" messages
- They're created automatically on first run

**CORS errors?**
- Add your frontend domain to `VITE_DEV_ORIGIN` in Railway variables
- Update CORS origins in `main.py` if needed

### 10. Updates

To deploy updates:
```bash
# Commit changes
git add .
git commit -m "Update API"
git push

# Railway auto-deploys!
```

Or with Railway CLI:
```bash
railway up
```

## 🔧 Important: Monorepo Configuration

Since your backend is in a subdirectory (`server/`), Railway needs special configuration:

**Files created in root:**
- `Procfile` - Start command with `cd server`
- `nixpacks.toml` - Build config with `cd server`
- `railway.json` - Railway-specific settings

These files ensure Railway:
1. Changes to server directory before installing
2. Changes to server directory before starting
3. Only watches server files for changes

## 🎉 That's It!

Your API is now live on Railway with:
- ✅ Auto-created super admin accounts
- ✅ SQLite database
- ✅ SendGrid email integration
- ✅ Automatic HTTPS
- ✅ Zero-downtime deployments
- ✅ Monorepo support (server/ subdirectory)

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Your API Docs: `https://your-app.railway.app/docs`

---

**Made with ❤️ for IRONHEX Technology Solutions** 🇹🇳
