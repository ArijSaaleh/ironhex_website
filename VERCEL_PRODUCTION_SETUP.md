# Vercel Production Setup - Complete Guide

## Issue History & Solutions

### Problem 1: 405 Method Not Allowed ❌ → ✅ FIXED
**Error:** `POST https://www.ironhex-tech.com/api/auth/login 405`

**Root Cause:** Frontend was sending requests to Vercel static host instead of Railway backend.

**Solution:** Set `VITE_API_URL` environment variable in Vercel (see Step 1 below).

---

### Problem 2: CSP Violation ❌ → ✅ FIXED
**Error:** `Refused to connect because it violates the document's Content Security Policy`

**Root Cause:** Default CSP blocks external API calls.

**Solution:** Added CSP headers to `vercel.json` allowing Railway backend domain (already in repo).

---

## Setup Steps

### Step 1: Set Environment Variable in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://ironhexwebsite-production.up.railway.app`
   - **Environments:** Check ✅ **Production** (and optionally Preview)
5. Click **Save**

### Step 2: Verify CSP Headers

The `vercel.json` file already includes CSP headers that allow:
- `connect-src 'self' https://ironhexwebsite-production.up.railway.app`

This allows your frontend to make API calls to your Railway backend.

### Step 3: Deploy

**Option A - From Vercel Dashboard:**
1. Go to **Deployments** tab
2. Click ⋮ on latest deployment
3. Click **Redeploy**

**Option B - Push to GitHub:**
```bash
git push
```
(Vercel auto-deploys on push)

### Step 4: Verify It Works

1. Wait 1-2 minutes for deployment
2. Visit https://www.ironhex-tech.com
3. Open DevTools (F12) → Console tab
4. Look for debug logs:
   ```
   [API] { 
     resolved: "https://ironhexwebsite-production.up.railway.app/api/auth/login",
     apiBase: "https://ironhexwebsite-production.up.railway.app",
     host: "www.ironhex-tech.com"
   }
   ```
5. Try logging in:
   - Username: `arij`
   - Password: `Admin2025!`
6. Check Network tab - should see `200 OK` ✅

---

## Current Configuration

### vercel.json (CSP Headers)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "connect-src 'self' https://ironhexwebsite-production.up.railway.app;"
        }
      ]
    }
  ]
}
```

### Environment Variables Required
| Variable | Value | Where to Set |
|----------|-------|--------------|
| `VITE_API_URL` | `https://ironhexwebsite-production.up.railway.app` | Vercel Dashboard → Settings → Environment Variables |

---

## Troubleshooting

### ❌ Still seeing 405?
- **Check:** VITE_API_URL is set in Vercel (Settings → Environment Variables)
- **Check:** You redeployed after setting the variable
- **Clear:** Browser cache (Ctrl+Shift+Delete) and hard refresh (Ctrl+F5)

### ❌ CSP violation error?
- **Check:** Latest `vercel.json` is deployed (should have CSP headers)
- **Check:** Browser console for actual CSP error message
- **Try:** Hard refresh to clear cached headers

### ❌ CORS error?
Backend already allows all origins (`allow_origins=["*"]`). If you still see CORS:
1. Check Railway logs for the request
2. Verify request includes correct headers
3. Check if Cloudflare or other proxy is interfering

### ❌ Railway backend 502?
- **Check:** https://ironhexwebsite-production.up.railway.app/api/health
- **Check:** Railway dashboard → Deployments → Logs
- **Verify:** Backend started successfully with super admin messages

---

## Quick Test Commands

### Test Railway backend health:
```bash
curl https://ironhexwebsite-production.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "service": "IRONHEX Messages API"
}
```

### Test login endpoint:
```bash
curl -X POST https://ironhexwebsite-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=arij&password=Admin2025!"
```

Expected response:
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "must_change_password": true
}
```

---

## Architecture Overview

```
┌─────────────────────┐
│   www.ironhex.com   │  (Vercel - Static Frontend)
│   ┌───────────────┐ │
│   │  React App    │ │
│   │  VITE_API_URL │ │───┐
│   └───────────────┘ │   │
└─────────────────────┘   │
                          │ API Calls
                          │ (via CSP allowed domain)
                          ▼
        ┌────────────────────────────────────┐
        │  Railway Backend                   │
        │  ironhexwebsite-production.up...   │
        │  ┌──────────────────────────────┐  │
        │  │  FastAPI Server              │  │
        │  │  - Auth endpoints            │  │
        │  │  - Message endpoints         │  │
        │  │  - Demo request endpoints    │  │
        │  └──────────────────────────────┘  │
        └────────────────────────────────────┘
```

---

## Files Modified

1. ✅ `vercel.json` - Added CSP headers
2. ✅ `client/src/config/api.ts` - API helper with environment variable support
3. ✅ `client/.env.example` - Template for required variables

---

**🎉 After following these steps, your production site should work perfectly!**

Last updated: November 4, 2025
