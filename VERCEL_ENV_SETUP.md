# Fix 405 Error - Set VITE_API_URL in Vercel

## Problem
Your production site at `www.ironhex-tech.com` is sending API requests to itself (Vercel static host) instead of your Railway backend, causing 405 errors.

**Current behavior:**
```
POST https://www.ironhex-tech.com/api/auth/login → 405 (Vercel has no API handler)
```

**Expected behavior:**
```
POST https://ironhexwebsite-production.up.railway.app/api/auth/login → 200 (Railway backend)
```

## Solution: Add Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your project: `ironhex-website` (or whatever name you used)
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

### Step 2: Add VITE_API_URL
1. Click **Add New** button
2. Fill in:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://ironhexwebsite-production.up.railway.app`
   - **Environments:** Check ✅ **Production** (and optionally Preview/Development)
3. Click **Save**

### Step 3: Redeploy
After adding the environment variable, you MUST redeploy:

**Option A: Trigger from dashboard**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the 3-dots menu ⋮
4. Click **Redeploy**

**Option B: Push a new commit**
```bash
# Make a small change (or empty commit)
git commit --allow-empty -m "Trigger Vercel rebuild with VITE_API_URL"
git push
```

### Step 4: Verify
1. Wait 1-2 minutes for deployment to complete
2. Visit https://www.ironhex-tech.com
3. Open DevTools Console (F12)
4. Look for debug logs like:
   ```
   [API] { resolved: "https://ironhexwebsite-production.up.railway.app/api/auth/login", apiBase: "https://ironhexwebsite-production.up.railway.app", host: "www.ironhex-tech.com" }
   ```
5. Try logging in
6. Check Network tab - Request URL should now be: `https://ironhexwebsite-production.up.railway.app/api/auth/login`

## Important Notes

✅ **Vite requires VITE_ prefix** - Environment variables must start with `VITE_` to be embedded in the client build.

✅ **No trailing slash** - Use `https://ironhexwebsite-production.up.railway.app` (without trailing `/`)

✅ **Must redeploy** - Vercel only injects environment variables at build time, not runtime.

## Troubleshooting

### Still seeing 405 after redeploy?
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check Vercel deployment logs to confirm build succeeded
- Verify env var shows in Settings → Environment Variables

### Railway backend returns 502?
- Check Railway deployment logs for errors
- Verify backend is running: visit `https://ironhexwebsite-production.up.railway.app/api/health`

### CORS errors?
- Your backend already has `allow_origins=["*"]` so this should work
- If needed, update `server/main.py` to explicitly include your domain

## Quick Test Commands

Test Railway backend directly:
```bash
curl https://ironhexwebsite-production.up.railway.app/api/health
```

Test login endpoint:
```bash
curl -X POST https://ironhexwebsite-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=arij&password=Admin2025!"
```

---

**After setting VITE_API_URL and redeploying, your login should work! ✅**
