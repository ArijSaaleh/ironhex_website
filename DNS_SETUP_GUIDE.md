# 🌐 DNS Setup Guide for Squarespace

## Current Issue
Your domain `ironhex-tech.com` is pointing to **TWO IP addresses**:
- ❌ `216.198.79.1` (Squarespace parking page)
- ✅ `51.91.8.230` (Your VPS)

This causes the root domain to show Squarespace instead of your website.

---

## ✅ Correct DNS Configuration

Go to your Squarespace DNS settings and configure:

### **A Records** (for root domain)

| Type | Host | Points To | TTL |
|------|------|-----------|-----|
| **A** | `@` | `51.91.8.230` | 3600 |

### **A Records** (for www subdomain)

| Type | Host | Points To | TTL |
|------|------|-----------|-----|
| **A** | `www` | `51.91.8.230` | 3600 |

### **Important:**
1. **DELETE** any existing A records pointing to `216.198.79.1`
2. Keep **ONLY** the A records pointing to `51.91.8.230`
3. There should be **NO CNAME** records for @ or www

---

## 🔍 Verification

After updating DNS (wait 5-30 minutes for propagation):

### Windows PowerShell:
```powershell
nslookup ironhex-tech.com
nslookup www.ironhex-tech.com
```

### Expected Result:
```
ironhex-tech.com
Address: 51.91.8.230

www.ironhex-tech.com
Address: 51.91.8.230
```

### Test Website:
```
http://ironhex-tech.com
http://www.ironhex-tech.com
```

Both should show your IRONHEX website, not Squarespace.

---

## 🔐 SSL Setup (After DNS Works)

Once DNS is propagated, run:

```bash
ssh ubuntu@51.91.8.230
cd /var/www/ironhex
sudo ./deployment/docker-ssl-setup.sh ironhex-tech.com
```

This will:
- Install Let's Encrypt SSL certificate
- Enable HTTPS
- Auto-renew certificates

---

## 📝 Common Issues

### "Website not loading"
- **Cause:** DNS not propagated yet
- **Fix:** Wait 5-30 minutes, clear browser cache

### "Shows Squarespace page"
- **Cause:** Multiple A records or CNAME redirect
- **Fix:** Delete Squarespace A record (216.198.79.1)

### "Certificate error"
- **Cause:** Trying HTTPS before SSL setup
- **Fix:** Use HTTP first, then run SSL setup script

---

## ✅ Current Status

- ✅ VPS running at `51.91.8.230`
- ✅ www.ironhex-tech.com → Points to VPS
- ❌ ironhex-tech.com → Points to both Squarespace AND VPS
- ⚠️ Need to remove Squarespace A record
